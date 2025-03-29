import React from "react";
import { useDocketContextData } from "../../../../../Context/DocketContext.jsx";
import SearchBarDocket from "./SearchBarDocket.jsx";
import ConsignorConsigneeDetails from "../New Docket/NewDocketComponents/ConsignorConsigneeDetails.jsx";
import LorryDetail from "../New Docket/NewDocketComponents/LorryDetail.jsx";
import ItemDetails from "../New Docket/NewDocketComponents/ItemDetails.jsx";
import PaymentDetails from "../New Docket/NewDocketComponents/PaymentDetails.jsx";
import DocketDetails from "./DocketDetails.jsx";

export default function NewDocketFormMaker() {
  const { searchedDocketNo } = useDocketContextData();

  const components = [
    <DocketDetails/>,
    <ConsignorConsigneeDetails/>,
    <LorryDetail/>,
    <ItemDetails/>,
    <PaymentDetails/>,
  ];

  return (
    <>
      <div className="flex justify-around bg-[#CBD5E1] p-4">
        <SearchBarDocket />
      </div>
      {searchedDocketNo == null ? (
        <div className="flex m-14 justify-center">
          <img
            src="./Images/logo/Logo-jpg-1.jpg"
            alt="Logo"
            className="h-80 rounded-xl"
          />
        </div>
      ) : (
        <div className="">
          {components.map((component, componentNo) => (
            <div key={componentNo}>{component}</div>
          ))}
        </div>
      )}
    </>
  );
}
