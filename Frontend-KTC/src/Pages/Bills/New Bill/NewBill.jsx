import { Form, Formik } from 'formik'
import {useCallback} from 'react'
import initialBillValues from '../InitialValuesBillForm'
import NewBillValidationSchema from './NewBillValidationSchema'
import NewBillFormMaker from './NewBillFormMaker'
import Dockets from '../Bill Components/Dockets'
import HeaderBill from '../Bill Components/HeaderBill'
import PartySection from '../Bill Components/PartySection'

export default function NewBill() {
    console.log("in main bill")

    const onSubmit= useCallback(async (values) => {
    console.log("Form Data:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/bill/new",
        values,
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }, []);


  return (
    <Formik
      initialValues={initialBillValues}
      validationSchema={NewBillValidationSchema}
      onSubmit={onSubmit}
    >
    {()=>(
        <Form>
            <div>
                <HeaderBill/>
                
                <PartySection/>
                <Dockets/>


                
            </div>
        </Form>
    )}
    </Formik>
  )
}
