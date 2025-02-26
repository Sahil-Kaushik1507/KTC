import React from 'react'
import InputControl from "../../../../../InputComponents/InputController";


export default function ItemDetails() {
  return (
    <>
     {/* Item Transmitied */}
     <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Item Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="Product" label="Product" type="text" />
          <InputControl name="TotalPackages" label="Total Packages" type="text" />
          <InputControl name="MethodOfPkg" label="Method Of Pkg" type="text" />
        </div>
      </div>

      {/* Billing Details */}
      <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Billing Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="InvoiceNo" label="InvoiceNo" type="text" />
          <InputControl name="DeclaredValue" label="Declared Value" type="text" />
          <InputControl name="EwayBillNo" label="Eway Bill No" type="text" />
        </div>
      </div>
    </>
  )
}
