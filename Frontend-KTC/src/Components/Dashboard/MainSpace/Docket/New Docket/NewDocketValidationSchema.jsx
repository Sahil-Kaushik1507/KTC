import * as Yup from "yup";


const NewDocketValidationSchema = Yup.object().shape({
  DocketNo: Yup.string().required("Docket number is required"),
  Date: Yup.date().nullable().required("Date is required"),
//   TruckNo: Yup.string().required("Truck number is required"),
});

export default NewDocketValidationSchema;