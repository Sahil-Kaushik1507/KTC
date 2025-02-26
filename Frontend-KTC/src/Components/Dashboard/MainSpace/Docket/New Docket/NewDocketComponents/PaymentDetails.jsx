import React from 'react'
import InputControl from "../../../../../InputComponents/InputController";


export default function PaymentDetails() {
  return (
      <>
       {/* Charges Details */}
       <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Charges Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ProvisionalAmount" label="Provisional Amount" type="text" />
          <InputControl name="GreenTax" label="Green Tax" type="text" />
          <InputControl name="LabourCharges" label="Labour Charges" type="text" />
          <InputControl name="HoldingCharges" label="Holding Charges" type="text" />
          <InputControl name="MultiPointPickUpCharges" label="Multi Point PickUp Charges" type="text" />
          <InputControl name="MultiPointDileveryCharges" label="Multi Point Dilevery Charges" type="text" />
          <InputControl name="DocketCharges" label="Docket Charges" type="text" />
          <InputControl name="OtherCharges" label="Other Charges" type="text" />
        </div>
      </div>

      {/* Payment-GST Details */}
      <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
        Payment-GST Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="TotalAmount" label="Total Amount" type="text" />
          <InputControl name="GSTINPayableBy" label="GSTIN Payable By" type="text" />
          <InputControl name="PaymentMode" label="Payment Mode" type="text" />
          <InputControl name="BillingBranch" label="Billing Branch" type="text" />
          <InputControl name="Remarks" label="Remarks" type="text" />
        </div>
      </div>
      </>
  )
}
