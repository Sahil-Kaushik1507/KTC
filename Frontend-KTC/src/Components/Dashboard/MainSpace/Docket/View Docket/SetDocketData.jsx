import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function SetDocketData({ data }) {
  const { setValues } = useFormikContext();

  useEffect(() => {
    if (data) {
      console.log("Updating Formik Values:", data);
      setValues(data);
    }
  }, [data, setValues]);

  return null; // This component doesn't render anything
}
