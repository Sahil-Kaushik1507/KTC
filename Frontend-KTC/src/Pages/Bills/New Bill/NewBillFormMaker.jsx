import React, { useMemo } from "react";
import { useDocketContextData } from "../../../Context/DocketContext.jsx";

export default function NewBillFormMaker() {
  const { docketMainSpaceComponentNo } = useDocketContextData();


  const renderComponent = useMemo(() => {
    const components = {
      1: <Dockets/>,
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
