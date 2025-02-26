import React from "react";
import InputControl from "../../../../../InputComponents/InputController";

export default function LorryDetail() {
  return (
    <>
      {/* Movement Details */}
      <div className="mt-20 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Movement Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="Source" label="Source" type="text" />
          <InputControl name="Destination" label="Destination" type="text" />
        </div>
      </div>

      {/* Lorry Details */}
      <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Lorry Details
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <InputControl name="LorryNo" label="Lorry No" type="text" />
          <InputControl name="Size" label="Size" type="text" />
          <InputControl name="ActualWeight" label="Actual Weight" type="text" />
          <InputControl name="TruckFright" label="TruckFright" type="text" />
        </div>
      </div>
    </>
  );
}
