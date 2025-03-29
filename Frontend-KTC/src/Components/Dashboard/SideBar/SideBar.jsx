import React, { useCallback, useMemo } from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";

const SideBar = React.memo(() => {
  const { setSideBarOption } = useSideBarOptionsContextData();

  const sidebarOptionsList = useMemo(() => ["Docket", "Bill", "Payment","Add"], []);

  const handleClick = useCallback(
    (option) => {
      setSideBarOption(option);
    },
    [setSideBarOption]
  );

  return (
    <div className="side-bar flex h-full border-r-4 border-[#FBBF24] shadow-lg">
      <div className="main-side-bar bg-[#1E3A8A] text-[#F8FAFC] h-full w-28 pt-4">
        <ul className="text-center text-sm font-semibold">
          {sidebarOptionsList.map((option) => (
            <li
              key={option}
              className="my-2 mx-3 cursor-pointer rounded-lg border border-[#38BDF8] p-2 transition duration-300 hover:bg-[#38BDF8] hover:text-[#1E3A8A]"
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
