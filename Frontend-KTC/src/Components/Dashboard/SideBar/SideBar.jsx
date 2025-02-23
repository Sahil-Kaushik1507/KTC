import React, { useCallback, useMemo ,useEffect} from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";

const SideBar = React.memo(() => {
  const { setSideBarOption } = useSideBarOptionsContextData();

  const sidebarOptionsList = useMemo(() => ["Docket", "Bill", "Payment"], []);

  const handleClick = useCallback(
    (option) => {
      setSideBarOption(option);
    },
    [setSideBarOption]
  );

  return (
    <div className="side-bar flex h-full border-2">
      <div className="main-side-bar bg-mycolors-Medium_Teal_Blue text-mycolors-other border-mycolors-secondary-2 h-full w-16 border-r-1 pt-4">
        <ul className="text-center text-sm">
          {sidebarOptionsList.map((option) => (
            <li
              key={option}
              className="my-1 cursor-pointer rounded-lg border border-blue-500 p-1"
              onClick={() => handleClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SideBar;
