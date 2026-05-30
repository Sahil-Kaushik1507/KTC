import React from "react";
import useDocketInitialData from "../hooks/useDocketInitialData.js";
import useAuth from "../../auth/hooks/useAuth.js";

export default function HeaderDocket() {

  const { user } = useAuth();

  const { data } =
    useDocketInitialData(user.branch_id, user.branch_code);

  console.log(data.data.docketNo)

  const currentDate = (() => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(new Date());
  })();


  return (
    <div className="font-Roboto  w-full rounded-t-2xl text-lg font-bold text-[#1E293B] shadow-lg sticky top-0 z-50" >
      <h1 className="flex h-18 items-center justify-between rounded-t-2xl bg-[#1ba599] px-4 py-2 text-white">
        <div>
          <span>
            Docket No:{" "}
            <input
              type="text"
              name="DocketNo"
              value={data.data.docketNo || ""}
              readOnly
              className=" border-b border-white bg-transparent text-white outline-none"
            />
          </span>
          </div>

          <div>
            <span className="flex flex-col text-center">
              <span>
                Date:{" "}
                <input
                  type="text"
                  name="date"
                  value={currentDate || ""}

                  className="border-none bg-transparent text-white outline-none w-22"
                />
              </span>

              <span className="text-base text-[#f2af05]">
                Branch : {" "}
                <input
                  type="text"
                  name="Branch"
                  value={user.branch_name || ""}
                  readOnly
                  className="border-none bg-transparent outline-none w-22"
                /></span>
            </span>
          </div>
        
        <span className="flex items-center">
          <button
            type="button"
            className="mr-4 rounded-md bg-white px-4 py-1 text-[#0F766E]"
          // onClick={backClickHandel}
          >
            Back
          </button>
          <button
            type="button"
            className="mr-2 rounded-md bg-white px-4 py-1 text-[#0F766E]"
          // onClick={nextClickHandel}

          >
            Next
          </button>


          <button
            type="submit"
            className="rounded-md bg-white px-6 py-1 text-[#0F766E]"
          >
            Save
          </button>
        </span>
      </h1>
    </div>
  );
}
