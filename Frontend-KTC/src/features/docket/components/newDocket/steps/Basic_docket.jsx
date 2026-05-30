import React from 'react'
import {useFormContext} from 'react-hook-form'
import InputControl from '../../../../../Components/InputComponents/InputController'

export default function Basic_docket() {


  return (
    <div className='basic_docket w-full p-4'>
      {/* Consignor Details */}
      <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignor Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ConsignorName" label="Consignor Name" type="text" />
          <InputControl name="ConsignorAddress" label="Consignor Address" type="text" />
          <InputControl name="ConsignorGST" label="Consignor GST" type="text" />
        </div>
      </div>
      <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignor Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ConsignorName" label="Consignor Name" type="text" />
          <InputControl name="ConsignorAddress" label="Consignor Address" type="text" />
          <InputControl name="ConsignorGST" label="Consignor GST" type="text" />
        </div>
      </div>
      <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignor Details2
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ConsignorName" label="Consignor Name" type="text" />
          <InputControl name="ConsignorAddress" label="Consignor Address" type="text" />
          <InputControl name="ConsignorGST" label="Consignor GST" type="text" />
        </div>
      </div>
      <div className="mt-5 mb-16 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignor Details1
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ConsignorName" label="Consignor Name" type="text" />
          <InputControl name="ConsignorAddress" label="Consignor Address" type="text" />
          <InputControl name="ConsignorGST" label="Consignor GST" type="text" />
        </div>
      </div>
    </div>
  )
}
