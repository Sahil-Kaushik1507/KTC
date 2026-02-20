import React from 'react'
import InputControl from "../../../Components/InputComponents/InputController";


export default function Dockets() {
    
    console.log("in bill")
  return (
    <>
     {/* Dockets in the Bill */}
 <div className="mt-5 mb-15 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          Dockets
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <InputControl name="Docket1" label="Docket 1" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket2" label="Docket 2" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket3" label="Docket 3" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket4" label="Docket 4" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket5" label="Docket 5" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket6" label="Docket 6" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket7" label="Docket 7" type="select"  options={[1,2,3,4]}  />
          <InputControl name="Docket8" label="Docket 8" type="select"  options={[1,2,3,4]}  />
          
        </div>
      </div>

    </>
  )
}
