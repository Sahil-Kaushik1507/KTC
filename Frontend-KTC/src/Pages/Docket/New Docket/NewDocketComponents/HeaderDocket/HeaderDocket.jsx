import React from "react";
import DocketNo_Date from "./DocketNo_Date.jsx";
import BackNextBtn from "./BackNextBtn.jsx";
import SaveBtn from "./SaveBtn.jsx";

export default function HeaderDocket() {
  

  return (
    <div className="font-Roboto absolute top-0 left-0 z-10 w-full rounded-t-2xl text-lg font-bold text-[#1E293B] shadow-lg">
      <h1 className="flex h-18 items-center justify-between rounded-t-2xl bg-[#1ba599] px-4 py-2 text-white">
      <DocketNo_Date/>
        <span className="flex items-center">
        <BackNextBtn/>
        <SaveBtn/>
        </span>
      </h1>
    </div>
  );
}
