import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, FileText, ArrowRight, X, Truck, Package, Building2 } from "lucide-react";

export default function PDFDataSelect() {
    const location= useLocation();
    const docketData = location.state.docketData;

    console.log(docketData)
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showFreight, setShowFreight] = useState(false);

    const [charges, setCharges] = useState({
        freightamt: true,
        labour: true,
        holding: true,
        docket_charge: true,
        green_tax: false,
        other_charges: false,
        multipoint_pickup: false,
        multipoint_delivery: false,
    });


    //--------------------------------------------------

    const chargeLabels = {
        freightamt: "Truck Freight",
        labour: "Labour Charges",
        holding: "Holding Charges",
        docket_charge: "Docket Charges",
        green_tax: "Green Tax",
        other_charges: "Other Charges",
        multipoint_pickup: "Multi Point Pickup",
        multipoint_delivery: "Multi Point Delivery",
    };

    //--------------------------------------------------

    const selectedCharges = useMemo(() => {
        if (!showFreight) return {};

        return Object.keys(charges).reduce((obj, key) => {
            if (charges[key]) {
                obj[key] = docketData.party_freight[key];
            }

            return obj;
        }, {});
    }, [charges, showFreight, docketData]);

    //--------------------------------------------------

    const totalSelectedFreight = useMemo(() => {
        return Object.values(selectedCharges).reduce(
            (sum, value) => sum + Number(value || 0),
            0
        );
    }, [selectedCharges]);

    //--------------------------------------------------

    const handleCheckbox = useCallback((name) => {
        setCharges((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    }, []);

    //--------------------------------------------------

     const updatedDocketData = useMemo(() => {
        return {
            ...docketData,

            pdfOptions: {
                includeFreight: showFreight,

                selectedCharges,

                totalFreight: totalSelectedFreight,
            },
        };
    }, [docketData, showFreight, selectedCharges, totalSelectedFreight]);

    //--------------------------------------------------

    const generatePDF = async () => {
        setLoading(true);

        await new Promise((r) => setTimeout(r, 700));
  
        navigate("/docket/pdf-preview", {
            state: { docketData: updatedDocketData },
        });
    };

    //--------------------------------------------------

    return (
        <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl overflow-hidden mt-5">

            {/* Header */}

            <div className="bg-[#0F766E] text-white p-6">

                <div className="flex items-center gap-4">

                    <CheckCircle2 size={48} />

                    <div>

                        <h2 className="text-2xl font-bold">
                            Docket Saved Successfully
                        </h2>

                        <p className="opacity-90 mt-1">
                            Your docket has been saved to the server.
                        </p>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="p-6 space-y-6">

                {/* Summary */}

                <div className="grid md:grid-cols-3 gap-4">

                    <SummaryCard
                        title="Docket Number"
                        value={docketData.docket_no}
                        icon={<Truck size={18} />}
                    />

                    <SummaryCard
                        title="Consignor"
                        value={docketData.consignorDetails.consignor_party_name}
                        icon={<Package size={18} />}
                    />

                    <SummaryCard
                        title="Consignee"
                        value={docketData.consigneeDetails.consignee_party_name}
                        icon={<Building2 size={18} />}
                    />

                </div>

                {/* PDF SETTINGS */}

                <div className="border rounded-xl">

                    <div className="flex items-center gap-2 border-b p-4 bg-gray-50">

                        <FileText size={20} />

                        <h3 className="font-semibold">
                            PDF Configuration
                        </h3>

                    </div>

                    <div className="p-5 space-y-5">

                        <label className="flex items-center gap-3 cursor-pointer">

                            <input
                                type="checkbox"
                                checked={showFreight}
                                onChange={() => setShowFreight(!showFreight)}
                                className="h-5 w-5"
                            />

                            <span className="font-medium">
                                Include Freight Details
                            </span>

                        </label>

                        {showFreight && (

                            <>

                                <div className="grid md:grid-cols-2 gap-3">

                                    {Object.keys(charges).map((key) => (

                                        <label
                                            key={key}
                                            className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                                        >

                                            <div>

                                                <div className="font-medium">
                                                    {chargeLabels[key]}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    ₹ {docketData.party_freight[key]}
                                                </div>

                                            </div>

                                            <input
                                                type="checkbox"
                                                checked={charges[key]}
                                                onChange={() => handleCheckbox(key)}
                                                className="h-5 w-5"
                                            />

                                        </label>

                                    ))}

                                </div>

                            </>

                        )}

                    </div>

                </div>

                {/* Preview */}

                {/* <div className="border rounded-xl">

          <div className="bg-gray-50 p-4 border-b">

            <h3 className="font-semibold">
              PDF Preview Summary
            </h3>

          </div>

          <div className="p-5">

            {!showFreight && (

              <div className="text-gray-500">
                Freight details will not be displayed in PDF.
              </div>

            )}

            {showFreight && (

              <>

                <div className="space-y-2">

                  {Object.entries(selectedCharges).map(([key, value]) => (

                    <div
                      key={key}
                      className="flex justify-between"
                    >

                      <span>{chargeLabels[key]}</span>

                      <span>
                        ₹ {value}
                      </span>

                    </div>

                  ))}

                </div>

                <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">

                  <span>Total Freight</span>

                  <span>
                    ₹ {totalSelectedFreight}
                  </span>

                </div>

              </>

            )}

          </div>

        </div> */}

            </div>

            {/* Footer */}

            <div className="border-t p-5 flex justify-between mb-20">

                <button
                    onClick={() => { }}
                    className="flex items-center gap-2 rounded-lg border px-5 py-2 hover:bg-red-300"
                >

                    <X size={18} />

                    Close

                </button>

                <button
                    disabled={loading}
                    onClick={generatePDF}
                    className="bg-[#0F766E] hover:bg-[#0d5050] text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >

                    {loading ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Preparing PDF...
                        </>
                    ) : (
                        <>
                            Generate PDF
                            <ArrowRight size={18} />
                        </>
                    )}

                </button>

            </div>

        </div>
        </div>
    );
}

//--------------------------------------------------

function SummaryCard({ title, value, icon }) {
    return (
        <div className="border rounded-xl p-4">

            <div className="flex items-center gap-2 text-blue-600 text-sm">

                {icon}

                {title}

            </div>

            <div className="mt-2 font-semibold text-lg break-all">

                {value}

            </div>

        </div>
    );
}