import React, { useMemo, useCallback } from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";

const SubSideBar = React.memo(() => {
  const { sideBarOption,setSubSideBarOption } = useSideBarOptionsContextData();


  //  Sidebar Options List
  const subSideBarOptionsList = useMemo(
    () => ({
      Docket: ["New Docket", "View Docket"],
      Bill: ["New Bill", "View Bill"],
      Payment: ["New Payment", "View Payment"],
    }),
    [],
  );

  const handleClick = useCallback(
    (option) => {
      setSubSideBarOption(option);
    },
    [setSubSideBarOption,sideBarOption],
  );

  // Get options for the current sidebar selection
  const options = subSideBarOptionsList[sideBarOption] || [];

  return (
    <div className="side-bar bg-mycolors-Cadet_Blue text-mycolors-other border-mycolors-secondary-2 h-full w-48 border-2 border-r-1 pt-4">
      <h1 className="pl-2">{sideBarOption}</h1>
      <ul className="pl-3 text-sm">
        {options.map((option) => (
          <li
            key={option}
            className="my-1 p-1"
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
