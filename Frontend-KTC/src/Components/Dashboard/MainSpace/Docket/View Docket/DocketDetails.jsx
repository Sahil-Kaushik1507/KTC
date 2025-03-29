import React from "react";
import InputControl from "../../../../InputComponents/InputController";
import { useDocketContextData } from "../../../../../Context/DocketContext";

export default function DocketDetails() {
  const {isReadOnly}=useDocketContextData();
  return (
    <>
      {/* Basic Details */}
      <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg ">
      <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
        Docket Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="DocketNo" label="Docket Number" type="text" readOnly={isReadOnly}/>
          <InputControl name="Date" label="Date" type="text" readOnly={isReadOnly}/>
          <InputControl name="Branch" label="Branch" type="text" readOnly={isReadOnly}/>
        </div>
      </div>

    </>
  );
}
