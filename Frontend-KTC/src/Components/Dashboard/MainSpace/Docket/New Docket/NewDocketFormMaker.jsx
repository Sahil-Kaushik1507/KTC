import React, { useMemo } from "react";
import CompanySelection from "./NewDocketComponents/CompanySelection.jsx";
import HeaderDocket from "./NewDocketComponents/HeaderDocket/HeaderDocket.jsx";
import LorryDetail from "./NewDocketComponents/LorryDetail.jsx";
import ConsignorConsigneeDetails from "./NewDocketComponents/ConsignorConsigneeDetails.jsx";
import ItemDetails from "./NewDocketComponents/ItemDetails.jsx";
import PaymentDetails from "./NewDocketComponents/PaymentDetails.jsx";
import { useDocketContextData } from "../../../../../Context/DocketContext.jsx";

export default function NewDocketFormMaker() {
  const { docketMainSpaceComponentNo } = useDocketContextData();

  const Headings = {
    1: "Consignor Consignee Details",
    2: "Lorry Detail",
    3: "Item Details",
    4: "Payment Details",
  };
  const renderComponent = useMemo(() => {
    const components = {
      1: <ConsignorConsigneeDetails />,
      2: <LorryDetail />,
      3: <ItemDetails />,
      4: <PaymentDetails />,
    };

    return components[docketMainSpaceComponentNo] || null;
  }, [docketMainSpaceComponentNo]);

  return (
    <>
      {docketMainSpaceComponentNo === 0 ? (
        <div className="flex justify-around bg-[#CBD5E1] p-4">
          <CompanySelection />
        </div>
      ) : (
        <div>
          <HeaderDocket />
         {renderComponent}
        </div>
      )}
    </>
  );
}
