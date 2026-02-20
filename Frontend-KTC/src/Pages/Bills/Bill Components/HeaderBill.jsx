import { useFormikContext } from "formik";
import{ useEffect} from "react"

export default function HeaderBill() {
  const { values,isValid, dirty,setFieldValue} = useFormikContext();


  const currentDate = () => {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      }).format(new Date());
    };
  
    useEffect(() => {

       if (!values.BillNo) {
        setFieldValue("BillNo", "1");
      }
  
      if (!values.Date) {
        setFieldValue("Date", currentDate());
      }
    }, [ values.Date, setFieldValue]);
  

  return (
    <div className="font-Roboto absolute top-0 left-0 z-10 w-full rounded-t-2xl text-lg font-bold text-[#1E293B] shadow-lg">
      <h1 className="flex h-18 items-center justify-between rounded-t-2xl bg-[#1ba599] px-4 py-2 text-white">

        <span>
        Bill No:{" "}
        <input
          type="text"
          name="BillNo"
          value={values.BillNo || ""}
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

      {isValid && dirty ?   (<button
        type="submit"
        className="rounded-md bg-white px-6 py-1 text-[#0F766E]"
      >
        Save
      </button>): null}


      </h1>
    </div>
  );
}
