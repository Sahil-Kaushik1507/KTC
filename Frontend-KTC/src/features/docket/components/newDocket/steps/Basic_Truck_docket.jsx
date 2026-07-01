import React from 'react'
import { useFormContext } from 'react-hook-form'
import InputControl from '../../../../../Components/InputComponents/InputController'
import useDocketInitialData from '../../../hooks/useDocketInitialData'
import useAuth from '../../../../auth/hooks/useAuth'
import { getTruckDetails } from '../../../api/newDocketApi'

export default function Basic_Truck_docket() {

  const { user } = useAuth();

  const { data } = useDocketInitialData(user.branch_id, user.branch_code);


  const formatTruckNumber = (value) => {
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 10);

    if (!cleaned) return "";

    const groups = [];
    let current = cleaned[0];

    for (let i = 1; i < cleaned.length; i++) {
      const prevIsDigit = /\d/.test(cleaned[i - 1]);
      const currIsDigit = /\d/.test(cleaned[i]);

      if (prevIsDigit !== currIsDigit) {
        groups.push(current);
        current = cleaned[i];
      } else {
        current += cleaned[i];
      }
    }

    groups.push(current);

    return groups.join("-");
  };

  const { trigger, getValues, setValue } = useFormContext();

  const checkTruckNo = async () => {
    // console.log(getValues("truck_details.truck_no"));
    const isValid = await trigger("truck_details.truck_no");
    if (!isValid) return;
    const truckNo = getValues("truck_details.truck_no");
    // console.log(truckNo)

    let truckDetails;
    try {
      truckDetails = await getTruckDetails({ "truck_no": truckNo })
    } catch (error) {
      console.log(error)
    }

    if (truckDetails) {
      const options = { shouldValidate: true, shouldDirty: true };

      setValue("vehicle_id", truckDetails.data[0].vehicle_id, options);
      setValue("truck_details.actual_weight", truckDetails.data[0].actual_weight, options);
      setValue("truck_details.driver_phone", truckDetails.data[0].driver_phone, options);
      setValue("truck_details.driver_name", truckDetails.data[0].driver_name, options);
      setValue("truck_details.size_id", truckDetails.data[0].size_id, options);
    } else {
      const clearOptions = { shouldValidate: false, shouldDirty: true };
      setValue("vehicle_id", null, clearOptions);
      setValue("truck_details.actual_weight", null, clearOptions);
      setValue("truck_details.driver_phone", null, clearOptions);
      setValue("truck_details.driver_name", null, clearOptions);
      setValue("truck_details.size_id", null, clearOptions);
    }
  };

  const addnew = () => {
    alert("hiii ")
  }

  return (
    <div className='basic_docket w-full p-4'>
      {/* Movement Details */}
      <div className="w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Movement Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="source" label="Source" type="searchabledroupdown" options={data.data.sourcelist} />
          <InputControl name="destination" label="Destination" type="searchabledroupdown" options={data.data.destinationlist} allowAddNew onAddNew={addnew} />
        </div>
      </div>

      {/* Truck Details */}
      <div className="mt-5 mb-16 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Truck Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="truck_details.truck_no" label="Truck No" type="text"
            onChange={(e) => {
              e.target.value = formatTruckNumber(e.target.value);
            }}

            onBlur={checkTruckNo}
          />
          <InputControl name="charged_weight" label="Charged Weight" type="text" />
          <InputControl name="truck_details.size_id" label="Size" type="searchabledroupdown" options={data.data.vehicle_sizes} valueKey="size_id" labelKey="size_name" />
          <InputControl name="truck_details.actual_weight" label="Actual Weight" type="text" />
          <InputControl name="truck_details.driver_name" label="Driver Name" type="text" />
          <InputControl name="truck_details.driver_phone" label="Driver Phone" type="number" />
          <InputControl name="seal_no" label="Seal Number" type="text" />
        </div>
      </div>

    </div>
  )
}
