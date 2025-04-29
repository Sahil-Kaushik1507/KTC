import React, { useMemo, useCallback } from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";
import { useDocketContextData } from "../../../Context/DocketContext.jsx";

const SubSideBar = React.memo(() => {
  const { sideBarOption, setSubSideBarOption } = useSideBarOptionsContextData();
  const{setIsReadOnly,setSearchedDocketNo}=useDocketContextData();

  // Sidebar Options List
  const subSideBarOptionsList = useMemo(
    () => ({
      Docket: ["New Docket", "View Docket"],
      Bill: ["New Bill", "View Bill"],
      Payment: ["New Payment", "View Payment"],
      Add:["Consignor","Consignee","Rates","Branch"],
    }),
    []
  );

  const handleClick = useCallback(
    (option) => {
      setSubSideBarOption(option);
      if(option=="New Docket"){
        setIsReadOnly(false);
        setSearchedDocketNo(null);
      }
    },
    [setSubSideBarOption, sideBarOption]
  );

  // Get options for the current sidebar selection
  const options = subSideBarOptionsList[sideBarOption] || [];

  return (
    <div className="side-bar bg-[#1E40AF] text-[#F8FAFC] border-r-4 border-[#FBBF24] h-full w-40 shadow-lg pt-4">
      <h1 className="pl-4 text-lg font-semibold text-[#FBBF24]">
        {sideBarOption}
      </h1>
      <ul className="pl-5 text-sm font-medium">
        {options.map((option) => (
          <li
            key={option}
            className="my-2 p-2 cursor-pointer rounded-md transition duration-300 hover:bg-[#38BDF8] hover:text-[#1E40AF]"
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SubSideBar;
