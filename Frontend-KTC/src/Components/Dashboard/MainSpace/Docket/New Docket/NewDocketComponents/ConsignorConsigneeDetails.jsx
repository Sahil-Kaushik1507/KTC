import React from "react";
import InputControl from "../../../../../InputComponents/InputController";
import { useDocketContextData } from "../../../../../../Context/DocketContext";

export default function ConsignorConsigneeDetails() {
  const {isReadOnly}=useDocketContextData();
  return (
    <>
      {/* Consignor Details */}
      <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignor Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="ConsignorName" label="Consignor Name" type="text" readOnly={isReadOnly}/>
          <InputControl name="ConsignorAddress" label="Consignor Address" type="text" readOnly={isReadOnly}/>
          <InputControl name="ConsignorGST" label="Consignor GST" type="text" readOnly={isReadOnly}/>
        </div>
      </div>

      {/* Consignee Details */}
      <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Consignee Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="ConsigneeName" label="Consignee Name" type="select" options={["a","b","c"]} readOnly={isReadOnly}/>
          <InputControl name="ConsigneeAddress" label="Consignee Address" type="text" readOnly={isReadOnly}/>
          <InputControl name="ConsigneeGST" label="Consignee GST" type="text" readOnly={isReadOnly}/>
          <InputControl name="ConsigneeContactPerson" label="Contact Person" type="text" />
        </div>
      </div>
    </>
  );
}
