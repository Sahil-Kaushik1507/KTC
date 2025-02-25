import React from 'react'
import { useFormikContext } from "formik";

export default function SaveBtn() {
     const { isValid, dirty} = useFormikContext();
  return (
    isValid && dirty ?   (<button
        type="submit"
        className="rounded-md bg-white px-6 py-1 text-[#0F766E]"
      >
        Save
      </button>): null
  )
}
