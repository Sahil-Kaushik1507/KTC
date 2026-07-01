import React, { useCallback, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useDocketInitialData from '../hooks/useDocketInitialData'
import Loader from '../../../Components/loader/Loader'
import useAuth from '../../auth/hooks/useAuth'
import ApiError from '../../../Components/apiError/ApiError'
import HeaderDocket from './HeaderDocket'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newDocketSchema } from '../schemas/docketSchema'
import axiosInstance from '../../../api/axios'
import { addNewDocketApi } from '../api/newDocketApi'
import useDocketFormDefaultValues from '../hooks/useDocketFormDefaultValues'
import { useQueryClient } from '@tanstack/react-query'
import PDFDataSelect from '../components/pdf/PDFDataSelect'


export default function NewDocketLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: docketInitialData, isFetching, isError, error, refetch } = useDocketInitialData(user.branch_id, user.branch_code);

  const docketFormDefaultValues = useDocketFormDefaultValues();

  const methods = useForm({
    resolver: zodResolver(newDocketSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: docketFormDefaultValues

  })

  const { handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, reset } = methods

  const [docketData, setDocketData] = useState(undefined)


  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onSubmit = async (formData) => {
    try {


      console.log("Docket Form data: ", formData)


      delete formData.temp_invoice_no;
      delete formData.temp_eway_bill_no;
      formData.branch_code = user.branch_code

      const truck_details = formData.truck_details;

      formData.docket_date = new Date(formData.docket_date).toISOString().split('T')[0];

      if (formData.vehicle_id) {
        delete formData.truck_details
      }

      const response = await addNewDocketApi(formData)
      console.log(response)


      if (response.success) {



        const foundConsignor = docketInitialData?.data?.consignorParties?.partyDetails?.find((opt) => opt.consignor_party_id == formData.consignor_id);

        const foundConsignee = docketInitialData?.data?.consigneeParties?.partyDetails?.find((opt) => opt.consignee_party_id == formData.consignee_id);

        const billingBranchDetails = docketInitialData?.data?.branch_list?.find((opt) => opt.branch_id == formData.billing_branch_id);

        const sizeDetails = docketInitialData?.data?.vehicle_sizes?.find((opt) => opt.size_id == truck_details.size_id);

        truck_details.size = sizeDetails.size_name;

        const { consignor_id, consignee_id, billing_branch_id, branch_id, branch_code, truck_freight, request_id, ...restOfFormData } = formData;

        const updatedFormData = {
          ...restOfFormData,
          docket_no: response.data.docketNo,
          truck_details: truck_details,
          consignorDetails: foundConsignor,
          consigneeDetails: foundConsignee,
          bookingBranch: user.branch_name,
          billingBranch: billingBranchDetails.branch_name,
        };

        console.log("in response sucess");

        console.log("Updated Form Data:", updatedFormData);
        setDocketData(updatedFormData);


        console.log("in submit before navigate+")
        navigate("/docket/pdf", { state: { docketData: updatedFormData } })


        reset({
          ...getDefaultValues(),
          request_id: crypto.randomUUID(),
        });



        queryClient.invalidateQueries({
          queryKey: ["new-docket-initial-data"],
          refetchType: "none",
        });


      }

    } catch (error) {
      console.error(error);
    }
  }


  return (

    <FormProvider {...methods}>

      <form

        onSubmit={handleSubmit(
          onSubmit,
          (errors) => {
            console.log("Validation Errors:", errors);
          }
        )}

        onKeyDown={checkKeyDown}

        className="h-full w-full">

        {isFetching ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex items-center justify-center">
            <ApiError error={error} refetch={refetch} isFetching={isFetching} />
          </div>

        ) : isSubmitting ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader text="Saving Docket..." />
          </div>

        ) : (
          <div className="bg-[#334155] h-full w-full overflow-y-auto rounded-lg ">

            <HeaderDocket />
            <Outlet />
          </div>
        )}




      </form>
    </FormProvider>
  );
}

