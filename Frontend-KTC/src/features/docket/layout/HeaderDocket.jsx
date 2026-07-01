import React, { useContext, useMemo } from "react";
import useDocketInitialData from "../hooks/useDocketInitialData.js";
import useAuth from "../../auth/hooks/useAuth.js";
import useDocketStepNavigation from "../hooks/useDocketStepNavigation.js";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight,Save } from 'lucide-react';

export default function HeaderDocket() {

  const { user } = useAuth();

  const { data } =
    useDocketInitialData(user.branch_id, user.branch_code);


  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(new Date());
  }, []);

  const { goNext, goPrevious } = useDocketStepNavigation();

  const { register, formState: { isDirty, isValid } } = useFormContext();


  return (
    <div className="font-Roboto  w-full rounded-t-2xl text-lg font-bold text-[#1E293B] shadow-lg sticky top-0 z-50" >
      <input type="hidden" {...register("request_id")} />
      <h1 className="flex h-18 items-center justify-between rounded-t-2xl bg-[#1ba599] px-4 py-2 text-white">
        <div>
          <span>
            Docket No:{" "}
            <input
              {...register("docket_no")}
              defaultValue={data?.data?.docketNo || "Loading..."}
              readOnly
              className="w-40 border-b border-white bg-transparent text-[#f2af05] outline-none"
            />
          </span>
        </div>

        <div>
          <span className="flex flex-col">
            <span>
              Date:{" "}
              <input
                {...register("docket_date")}
                defaultValue={currentDate || "Geting Today's Date..."}
                readOnly
                className="border-none bg-transparent text-white outline-none w-24"
              />
            </span>

            <span className="text-base text-[#f2af05] ">
              Branch:{" "}
              <input
                defaultValue={user.branch_name || "Geting your Branch Name..."}
                readOnly
                className="border-none bg-transparent outline-none w-24"
              />
              <input
                {...register("branch_id")}
                defaultValue={user.branch_id || "Geting your Branch ID..."}
                readOnly
                className="border-none bg-transparent outline-none w-24"
                hidden
              />

            </span>
          </span>
        </div>

        <span className="flex items-center">
   
          {isValid && isDirty ? (
            <>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-2 py-1 text-center text-lg text-[#0F766E]"
                onClick={goPrevious}
              >
                <ArrowLeft size={24}/>
              </button>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-2 py-1 text-center text-lg text-[#0F766E]"
                onClick={goNext}
              >
                <ArrowRight size={24}/>
              </button>
            
            </>
          ) : (
            <>
              <button
                type="button"
                className="mr-4 rounded-md bg-white px-3 py-1 text-[#0F766E] flex items-end"
                onClick={goPrevious}
              >
                <ChevronLeft size={24} className="-ml-3"/> Back 
              </button>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-3 py-1  text-[#0F766E] flex items-end"
                onClick={goNext}
              >
                Next <ChevronRight size={24} className="-mr-3" /> 
              </button>
            </>
          )}


          {isValid && isDirty ? (<button
            type="submit"
            className="rounded-md bg-white px-3 py-1 text-[#0F766E] flex items-end "
          >
            Save <Save size={18} className="ml-1 mb-1"/>
          </button>) : null
          }

          
        </span>
      </h1>
    </div>
  );
}
