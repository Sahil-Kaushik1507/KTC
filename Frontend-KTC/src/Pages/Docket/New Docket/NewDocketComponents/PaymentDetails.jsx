import React from 'react'
import InputControl from "../../../../Components/InputComponents/InputController";
import { useDocketContextData } from "../../../../Context/DocketContext";


export default function PaymentDetails() {
  const {isReadOnly}=useDocketContextData();
  return (
      <>

      

       {/* Taxes */}
       <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Taxes
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="OtherStateTax" label="Other State Tax" type="text" readOnly={isReadOnly}/>
          <InputControl name="GST" label="GST" type="text" readOnly={isReadOnly}/>
          <InputControl name="GrandTotalFreight" label="Grand Total (Truck Freight)" type="text" readOnly={isReadOnly}/>
          <InputControl name="GrandTotalCompanyAmt" label="Grand Total (Company Amount)" type="text" readOnly={isReadOnly}/>
         
        </div>
      </div>
      {/* Payment-GST Details */}
      <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
        Payment-GST Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="GSTINPayableBy" label="GSTIN Payable By" type="text" readOnly={isReadOnly}/>
          <InputControl name="PaymentMode" label="Payment Mode" type="text" readOnly={isReadOnly}/>
          <InputControl name="BillingBranch" label="Billing Branch" type="text" readOnly={isReadOnly} initialValues="Haridwar" />
         
        </div>
      </div>
      {/* Remarks */}
      <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
        Remarks
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
           <InputControl name="Remarks" label="Remarks" type="text" readOnly={isReadOnly} />
         
        </div>
      </div>
      </>
  )
}
