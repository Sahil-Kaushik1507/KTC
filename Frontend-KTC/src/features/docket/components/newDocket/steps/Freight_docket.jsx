import React,{useEffect} from 'react'
import InputControl from '../../../../../Components/InputComponents/InputController'
import { useFormContext,useWatch } from 'react-hook-form'
import useGrandTotal from '../../../../../hooks/useGrandTotal';
import useTruckPartyGrandTotal from '../../../hooks/useTruckPartyGrandTotal';

export default function Freight_docket() {


const {control, setValue} = useFormContext()

const [truckFreight,advance] = useWatch({
    control,
    name:["truck_freight.freightamt","truck_freight.advance"]
})

useEffect(() => {
  const freightNum = Number(truckFreight);
  const advanceNum = Number(advance);

  if (!isNaN(freightNum) && !isNaN(advanceNum)) {
    setValue(
      "truck_freight.balance", 
      freightNum - advanceNum, 
      {
        shouldDirty: false,
        shouldValidate: true,
      }
    );
  }
}, [truckFreight, advance, setValue]);



const [truckTotal,partyTotal] = useTruckPartyGrandTotal()


    return (
        <div className='freight_docket w-full p-4 pt-0'>

            {/* Total */}
            <div className="sticky top-16 mb-3 z-40 w-full rounded-b-xl bg-[#334155] shadow-lg border border-white/80">
                <div className="flex min-h-11 items-center justify-evenly rounded-b-xl bg-[#0f47ff] ">

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200">
                            Total Truck Freight:
                        </span>
                        <span className="rounded-md bg-white/10 px-3 py-1 font-semibold text-[#FBBF24]">
                            ₹ {truckTotal}.00
                        </span>
                    </div>

                    <div className="h-8 w-px ml-6 bg-white/80"></div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200">
                            Total Party Freight:
                        </span>
                        <span className="rounded-md bg-white/10 px-3 py-1 font-semibold text-[#FBBF24]">
                            ₹ {partyTotal}.00
                        </span>
                    </div>

                </div>
            </div>


            {/* Freight Details */}
            <div className="w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Freight Details
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    <InputControl name="truck_freight.freightamt" label="Truck Freight Amount" type="number" />
                    <InputControl name="party_freight.freightamt" label="Party Freight Amount" type="number" />


                </div>
            </div>

            {/* Truck Freight Distribution */}

            <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Truck Freight Split
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    <InputControl name="truck_freight.advance" label="Advance" type="number" />
                    <InputControl name="truck_freight.balance" label="Balance" type="number" readOnly  />


                </div>
            </div>


            {/* Charges Details */}
            <div className="mt-5 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Charges Details
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    <InputControl name="truck_freight.labour" label="Truck Labour Charges" type="number" />
                    <InputControl name="party_freight.labour" label="Party Labour Charges" type="number" />
                    <InputControl name="truck_freight.holding" label="Truck Holding Charges" type="number" />
                    <InputControl name="party_freight.holding" label="Party Holding Charges" type="number" />
                    <InputControl name="truck_freight.multipoint_pickup" label="Truck MultiPoint PickUp Charges" type="number" />
                    <InputControl name="party_freight.multipoint_pickup" label="Party MultiPoint PickUp Charges" type="number" />
                    <InputControl name="truck_freight.multipoint_delivery" label="Truck MultiPoint Dilevery Charges " type="number" />
                    <InputControl name="party_freight.multipoint_delivery" label="Party MultiPoint Dilevery Charges " type="number" />
                    <InputControl name="truck_freight.other_charges" label="Truck Other Charges" type="number" />
                    <InputControl name="party_freight.docket_charge" label="Party Docket Charges" type="number" />
                    <div></div>
                    {/* <InputControl name="blank" label="" type="number" readOnly isRegister={false}/> */}
                    <InputControl name="party_freight.green_tax" label="Party Green Tax" type="number" />
                    <div></div>
                    {/* <InputControl name="blank" label="" type="number" readOnly isRegister={false} /> */}
                    <InputControl name="party_freight.other_charges" label="Party Other Charges" type="number" />

                </div>
            </div>


            {/* Taxes */}

            <div className="mt-5 mb-16 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Taxes
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    <InputControl name="party_freight.gst_remark" label="GST Remark" type="text" />
                    <InputControl name="party_freight.gst_amt" label="GST Amount" type="number" />
                    <InputControl name="party_freight.other_state_tax_remark" label="Other State Tax Remark" type="text" />
                    <InputControl name="party_freight.other_state_tax_amt" label="Other State Tax Amount" type="number" />

                </div>
            </div>



        </div>
    )
}
