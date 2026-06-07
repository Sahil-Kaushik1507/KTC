import React from 'react'
import InputControl from '../../../../../Components/InputComponents/InputController'
import useAuth from '../../../../auth/hooks/useAuth'
import useDocketInitialData from '../../../hooks/useDocketInitialData'

export default function Billing_Remarks_docket() {

  const { user } = useAuth();

  const { data } = useDocketInitialData(user.branch_id, user.branch_code);

const gstPayableList = [{"opt":"Consignor"},{"opt":"Consignee"},{"opt":"Transporter"},]
const paymentModeList = [{"opt":"CASH"},{"opt":"NEFT"},{"opt":"RTGS"},{"opt":"CHEQUE"},{"opt":"TO PAY"},{"opt":"TO BE BILLED"},]

  return (
    <div className='billing_remarks w-full p-4'>

             
            {/* Billing Details */}
            <div className=" w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Billing Details
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4 ">
                    <InputControl name="billing_branch_id" label="Billing Branch"  type="searchabledroupdown" options={data.data.branch_list} valueKey="branch_id" labelKey="branch_name"/>
                    <InputControl name="gstin_payable_by" label="GSTIN Payable By" type="searchabledroupdown" options={gstPayableList} valueKey="opt" labelKey="opt"  />
                    <InputControl name="payment_mode" label="Payment Mode" type="searchabledroupdown" options={paymentModeList} valueKey="opt" labelKey="opt"  />
        

                </div>
            </div>
            {/* Remarks */}
            <div className="mt-5 mb-16 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Remarks
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4 ">
                    <InputControl name="remarks" label="Remarks" type="textarea" />

                </div>
            </div>
    </div>
  )
}
