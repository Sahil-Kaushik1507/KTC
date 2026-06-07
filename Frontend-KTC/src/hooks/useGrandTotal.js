import { useEffect, useMemo } from "react";
import { useFormContext,useWatch } from "react-hook-form";

export default function useGrandTotal(fieldNames, targetField) {
  const { control, setValue } = useFormContext();

  const values = useWatch({
    control,
    name: fieldNames,
  });

  const total = useMemo(
    () =>
      values.reduce(
        (sum, value) => sum + (Number(value) || 0),
        0
      ),
    [values]
  );

  useEffect(() => {
    setValue(targetField, total);
  }, [total, targetField, setValue]);

  return total;
}