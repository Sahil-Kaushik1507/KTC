import React ,{useEffect}from "react";
import { useDocketContextData } from "../../../../../../../Context/DocketContext.jsx";
import { useFormikContext } from "formik";

export default function DocketNo_Date() {
  const { currentDocketNo } = useDocketContextData();
  const { values, setFieldValue } = useFormikContext();

  const currentDate = () => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(new Date());
  };

  useEffect(() => {
    if (values.DocketNo !== currentDocketNo) {
      setFieldValue("DocketNo", currentDocketNo);
    }
    if (!values.Date) {
      setFieldValue("Date", currentDate());
    }
  }, [currentDocketNo, values.Date, setFieldValue]);

  return (
    <>
      <span>
        Docket No:{" "}
        <input
          type="text"
          name="DocketNo"
          value={values.DocketNo || ""}
          readOnly
          // onChange={(e)=>setFieldValue("DocketNo",e.target.value)}
          className="w-20 border-b border-white bg-transparent text-white outline-none"
        />
      </span>

      <span className="flex flex-col">
        <span>
        Date:{" "}
        <input
          type="text"
          name="date"
          value={values.Date || ""}
          readOnly
          className="border-none bg-transparent text-white outline-none w-22"
        />
          </span>
        
        <span className="text-base text-[#f2af05]">
          Branch : {" "}
          <input
          type="text"
          name="Branch"
          value="Haridwar"
          readOnly
          className="border-none bg-transparent outline-none w-22"
        /></span>
      </span>
    </>
  );
}
