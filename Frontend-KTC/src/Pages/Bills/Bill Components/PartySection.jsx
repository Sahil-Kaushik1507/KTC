import React from "react";
import InputControl from "../../../Components/InputComponents/InputController";


export default function PartySection() {
  return (
    <>
      {/* Party Details */}
         <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Party Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="PartyName" label="Party Name" type="text" />
          <InputControl name="PartyAddress" label="Party Address" type="text" />
          <InputControl name="PartyGST" label="Party GST" type="text" />
          <InputControl name="Item" label="Item" type="text" />
          <InputControl name="Amount" label="Amount" type="text" />
          <InputControl name="PaymentStatus" label="Payment Status" type="text" />
          <InputControl name="Remarks" label="Remarks" type="text" />
        </div>
      </div>
       

    </>
  );
}
