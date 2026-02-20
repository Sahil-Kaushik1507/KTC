import { useMemo } from "react";

const useInitialBillValues = () => {
  return useMemo(
    () => ({
      BillNo: "",
      Branch: "",
      Date: null,

      Docket1:"",
      Docket2:"",
      Docket3:"",
      Docket4:"",
      Docket5:"",
      Docket6:"",
      Docket7:"",
      Docket8:"",

      PartyName: "",
      PartyAddress: "",
      PartyGST: "",
      Item:"",
      Amount:"",

      PaymentStatus:"Not Paid",
     
      Remarks: "",
    }),
    [],
  );
};

export default useInitialBillValues;
