import React from 'react'
import { useDocketContextData } from "../../../../../../../Context/DocketContext.jsx";
import { useFormikContext } from "formik";

export default function BackNextBtn() {
    const {
        docketMainSpaceComponentNo,
        setDocketMainSpaceComponentNo,
      } = useDocketContextData();
      const { isValid, dirty} = useFormikContext();
    
    
      const backClickHandel = () => {
        if (docketMainSpaceComponentNo > 0) {
          setDocketMainSpaceComponentNo((prev) => prev - 1);
        }
      };
    
      const nextClickHandel = () => {
        if (docketMainSpaceComponentNo < 4) {
          setDocketMainSpaceComponentNo((prev) => prev + 1);
        }
      };
  return (
   <> {isValid && dirty ? (
            <>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-2 py-1 text-center text-lg text-[#0F766E]"
                onClick={backClickHandel}
              >
                ←
              </button>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-2 py-1 text-center text-lg text-[#0F766E]"
                onClick={nextClickHandel}
                disabled={docketMainSpaceComponentNo === 4}
              >
                →
              </button>
            
            </>
          ) : (
            <>
              <button
                type="button"
                className="mr-4 rounded-md bg-white px-4 py-1 text-[#0F766E]"
                onClick={backClickHandel}
              >
                Back
              </button>
              <button
                type="button"
                className="mr-2 rounded-md bg-white px-4 py-1 text-[#0F766E]"
                onClick={nextClickHandel}
                disabled={docketMainSpaceComponentNo === 4}
              >
                Next
              </button>
            </>
          )}
   </>
  )
}
