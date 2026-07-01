import React, { useMemo } from 'react'
import InputControl from '../../../../../Components/InputComponents/InputController'
import useAuth from '../../../../auth/hooks/useAuth'
import useDocketInitialData from '../../../hooks/useDocketInitialData'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useFetchPartyRate } from '../../../hooks/useFetchPartyRate';


export default function Parties_Items_docket() {

    const { user } = useAuth();

    const { data } = useDocketInitialData(user.branch_id, user.branch_code);

    const { control } = useFormContext();

    const selected_consignor_id = useWatch({
        control,
        name: "consignor_id"
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "docket_items"
    })


    const selected_consignor = useMemo(() => {
        return (
            data.data.consignorParties.partyDetails.find(
                opt => opt.consignor_party_id === selected_consignor_id
            ) || {}
        );
    }, [data, selected_consignor_id]);

    const addProducts = () => {
        append({
            product_name: "",
            total_packages: "",
            packaging_method: "",
            declared_value: ""
        })
    }

    function RateWatcher() {
        // console.log("hii watching...")
        // useFetchPartyRate();
        return null;
    }

    return (
        <div className='parties_item_docket w-full p-4 '>
            <div className=" w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
                    Party Details
                </h1>
                <div className="grid grid-cols-2 gap-4 p-4">
                    <InputControl name="consignor_id" label="Consignor" type="searchabledroupdown" options={data.data.consignorParties.partyDetails} valueKey="consignor_party_id" labelKey="consignor_party_name" allowAddNew


                    />

                    <InputControl name="consignee_id" label="Consignee" type="searchabledroupdown" options={data.data.consigneeParties.partyDetails} valueKey="consignee_party_id" labelKey="consignee_party_name" allowAddNew />

                </div>
            </div>
            <RateWatcher />
            {/* Item Transmitied */}
            <div className="mt-5 mb-16 pb-2 w-full rounded-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
                <div className="flex justify-between rounded-t-2xl bg-[#0F766E] py-2 pl-4 pr-5 text-white ">
                    <h1 className='py-1'>Product Details</h1>

                    <button
                        className="rounded-lg bg-[#0F766E] px-3 py-1 font-semibold text-[#FBBF24] shadow-sm transition-all duration-300 hover:bg-[#0D9488] hover:shadow-md"
                        onClick={addProducts}
                        type='button'
                    >
                        + Add Another Product
                    </button>
                </div>

                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="m-4 rounded-xl border border-gray-300 bg-[#a7d4d1] p-4 shadow-sm"
                    >
                        {/* Product Header */}
                        <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-3">
                            <p className="text-xl font-bold text-[#01534d]">
                                Product - {index + 1}
                            </p>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="rounded-md border border-red-300 bg-white px-3 py-1 text-sm font-medium text-red-600 transition-all duration-200 hover:border-red-500 hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        {/* Product Fields */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <InputControl
                                name={`docket_items.${index}.product_name`}
                                label="Product Name"
                                type="searchabledroupdown"
                                options={selected_consignor.products}
                                valueKey="product_name"
                                labelKey="product_name"
                            />

                            <InputControl
                                name={`docket_items.${index}.total_packages`}
                                label="Total Packages"
                                type="number"

                            />

                            <InputControl
                                name={`docket_items.${index}.packaging_method`}
                                label="Method Of Pkg"
                                type="text"
                            />

                            <InputControl
                                name={`docket_items.${index}.declared_value`}
                                label="Declared Value"
                                type="number"
                            />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
