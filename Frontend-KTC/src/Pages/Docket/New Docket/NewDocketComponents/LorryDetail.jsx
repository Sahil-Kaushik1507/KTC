import React from "react";
import InputControl from "../../../../Components/InputComponents/InputController";
import { useDocketContextData } from "../../../../Context/DocketContext";

export default function LorryDetail() {
    const {isReadOnly}=useDocketContextData();
  return (
    <>
    

      {/* Lorry Details */}
      <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Lorry Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="LorryNo" label="Lorry No" type="text" readOnly={isReadOnly}/>
          <InputControl name="Size" label="Size" type="text" readOnly={isReadOnly}/>
          <InputControl name="ActualWeight" label="Actual Weight" type="text" readOnly={isReadOnly}/>
          <InputControl name="ChargedWeight" label="Charged Weight" type="text" readOnly={isReadOnly}/>
          <InputControl name="TruckFreight" label="Truck Freight" type="text" readOnly={isReadOnly}/>
        </div>
      </div>

       {/* Charges Details */}
       <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Charges Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ProvisionalAmount" label="Provisional Amount" type="text" readOnly={isReadOnly}/>
          <InputControl name="GreenTax" label="Green Tax" type="text" readOnly={isReadOnly}/>
          <InputControl name="LabourCharges" label="Labour Charges" type="text" readOnly={isReadOnly}/>
          <InputControl name="HoldingCharges" label="Holding Charges" type="text" readOnly={isReadOnly}/>
          <InputControl name="MultiPointPickUpCharges" label="MultiPoint PickUp Charges" type="text" readOnly={isReadOnly}/>
          <InputControl name="MultiPointDileveryCharges" label="MultiPoint Dilevery Charges " type="text" readOnly={isReadOnly}/>
          <InputControl name="DocketCharges" label="Docket Charges" type="text" readOnly={isReadOnly}/>
          <InputControl name="OtherCharges" label="Other Charges" type="text" readOnly={isReadOnly}/>
          <InputControl name="SubTotal" label="Sub Total" type="text" readOnly={isReadOnly}/>
        </div>
      </div>
    </>
  );
}
