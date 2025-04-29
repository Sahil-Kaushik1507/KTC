import React, { useCallback } from "react";
import { useDocketContextData } from "../../../../../../Context/DocketContext.jsx";
import axios from "axios";
import HeaderDocket from "./HeaderDocket/HeaderDocket.jsx";

export default function CompanySelection() {
  const { setDocketMainSpaceComponentNo, setCurrentDocketNo } =
    useDocketContextData();

  const CompanyNames = ["Halonix", "Varamurti", "Hilla", "TechCorp"];

  const fetchCompanyNextDocket = useCallback(async (companyName) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/docket/new/company",
        {
          params: { companyName },
        },
      );
      setCurrentDocketNo(data.DocketNo);
      console.log(data);
    } catch (error) {
      console.error("API Error:", error.message || error);
    }
  }, []);

  const handleClick = useCallback(
    async (companyName) => {
      setDocketMainSpaceComponentNo(1);
      await fetchCompanyNextDocket(companyName);
    },
    [setDocketMainSpaceComponentNo, fetchCompanyNextDocket],
  );

  return (
    <>
      <div className="font-Roboto absolute top-0 left-0 z-10 w-full rounded-t-2xl bg-[#CBD5E1] text-lg font-bold text-[#1E293B] shadow-lg">
        <h1 className="rounded-t-2xl bg-[#0F766E] py-2 pl-4 text-white">
          New Docket
        </h1>
      </div>

      <div className="companySelection grid h-full w-full grid-cols-2 gap-4 p-4">
        {CompanyNames.map((companyName) => (
          <div
            key={companyName}
            className="flex h-32 cursor-pointer items-center justify-center rounded-lg bg-[#0F766E] text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#14B8A6]"
            onClick={() => handleClick(companyName)}
          >
            {companyName}
          </div>
        ))}
      </div>
    </>
  );
}
