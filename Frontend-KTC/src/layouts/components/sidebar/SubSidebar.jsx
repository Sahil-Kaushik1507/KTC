import React from "react";

import useSidebarStore from "../../../store/sidebarStore.js";

import { SIDEBAR_ITEMS } from "./sidebarConfig";

import { useNavigate } from "react-router-dom";

const SubSidebar = React.memo(() => {
  const sideBarOption = useSidebarStore(
    (state) => state.sideBarOption
  );

  const navigate = useNavigate();

  const selectedSidebar = SIDEBAR_ITEMS.find(
    (item) => item.label === sideBarOption
  );

  const handleClick = (label) => {
    const selectedSubItem =
      selectedSidebar.children.find(
        (subitem) => subitem.label === label
      );

    // console.log(selectedSubItem.path);

    navigate(selectedSubItem.path);
  };

  return (
    <div className="side-bar bg-[#1E40AF] text-[#F8FAFC] border-r-4 border-[#FBBF24] h-full w-40 shadow-lg pt-4">
      <h1 className="pl-4 text-lg font-semibold text-[#FBBF24]">
        {sideBarOption}
      </h1>

      <ul className="pl-5 text-sm font-medium pr-2">
        {selectedSidebar?.children?.map((child) => (
          <li
            key={child.id}
            className="my-2 p-2 cursor-pointer rounded-md transition duration-300 hover:bg-[#38BDF8] hover:text-[#1E40AF]"
            onClick={() => handleClick(child.label)}
          >
            {child.label}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SubSidebar;