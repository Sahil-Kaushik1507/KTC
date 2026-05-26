import React, { useCallback } from "react";

import useSidebarStore from "../../../store/sidebarStore.js";

import { SIDEBAR_ITEMS } from "./sidebarConfig";

const SideBar = React.memo(() => {
  const sideBarOption = useSidebarStore(
    (state) => state.sideBarOption
  );

  const setSideBarOption = useSidebarStore(
    (state) => state.setSideBarOption
  );

  const handleClick = useCallback(
    (label) => {
      setSideBarOption(label);
    },
    [setSideBarOption]
  );

  return (
    <div className="side-bar flex h-full border-r-4 border-[#FBBF24] shadow-lg">
      <div className="main-side-bar bg-[#1E3A8A] text-[#F8FAFC] h-full w-28 pt-4">
        <ul className="text-center text-sm font-semibold">
          {SIDEBAR_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`my-2 mx-3 cursor-pointer rounded-lg border border-[#38BDF8] p-2 transition duration-300
              
              ${
                sideBarOption === item.label
                  ? "bg-[#38BDF8] text-[#1E3A8A]"
                  : "hover:bg-[#38BDF8] hover:text-[#1E3A8A]"
              }`}
              onClick={() => handleClick(item.label)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SideBar;