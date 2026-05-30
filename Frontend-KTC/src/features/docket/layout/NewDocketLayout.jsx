import React, { useCallback } from 'react'
import { Outlet } from 'react-router-dom'
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


export default function NewDocketLayout() {
  const { user } = useAuth();

  const { isFetching, isError, error, refetch } =
    useDocketInitialData(user.branch_id, user.branch_code);

  const methods = useForm({
    resolver: zodResolver(newDocketSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false

  })

  const { handleSubmit, formState: { isSubmitting } } = methods

const onSubmit = useCallback(
  async (formData)=>{
      try {
        const response = await addNewDocketApi(formData)
        console.log(response)
      } catch (error) {
        
      }
  }, [])


  return (

    <FormProvider {...methods}>

      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">

     
          {isFetching ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : isError ? (
            <div className="w-full h-full flex items-center justify-center">
              <ApiError error={error} refetch={refetch} isFetching={isFetching} />
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