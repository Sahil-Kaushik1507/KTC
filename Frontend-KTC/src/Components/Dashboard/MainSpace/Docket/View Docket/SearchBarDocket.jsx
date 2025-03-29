import React,{useEffect} from "react";
import BasicInputBox from "../../../../InputComponents/BasicInputBox";
import { useDocketContextData } from "../../../../../Context/DocketContext";

export default function SearchBarDocket() {
  const { setIsReadOnly, isReadOnly,searchedDocketNo } = useDocketContextData();

  const handleDocketEdit =()=>{
    const isedit = window.confirm("Are you sure?");
    if(isedit){
      setIsReadOnly(false);
    }
  }
  useEffect(() => {
    console.log("Updated isReadOnly:", isReadOnly);
  }, [isReadOnly]);
  return (
    <div className="absolute top-0 left-0 z-10 w-full rounded-t-2xl bg-[#0F766E] px-6 py-4 shadow-lg">
      <div className="flex items-center justify-center gap-6">
        {/* Label & Input Wrapper */}
        <div className="flex items-center">
          <h1 className="w-56 text-lg font-semibold text-white">
            Enter Docket No:
          </h1>
          <BasicInputBox
            name="SearchDocket"
            placeholder="Docket No."
            label=""
            type="number"
            className="w-80 rounded-md border border-[#FBBF24] bg-white px-2 py-2 text-center font-medium text-[#1E293B] shadow-md transition-all duration-300 focus:ring-2 focus:ring-[#FACC15] focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          className="rounded-md bg-[#FBBF24] px-6 py-2 font-semibold text-[#1E293B] shadow-md transition-all duration-300 hover:bg-[#FACC15] hover:shadow-lg"
          type="submit"
        >
          Search
        </button>

        {/* Edit Button */}
        {searchedDocketNo != null ? (
          <button
            className="rounded-md bg-[#FBBF24] px-6 py-2 font-semibold text-[#1E293B] shadow-md transition-all duration-300 hover:bg-[#FACC15] hover:shadow-lg"
            type="button"
            onClick={handleDocketEdit}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
