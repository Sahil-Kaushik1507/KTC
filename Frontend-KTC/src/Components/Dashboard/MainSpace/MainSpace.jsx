import React, { useMemo } from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";
import ComponentMap from "./ComponentMapFuntion.jsx";
import { DocketContextProvider } from "../../../Context/DocketContext.jsx";

const MainSpace = React.memo(() => {
  const { sideBarOption, subSideBarOption } = useSideBarOptionsContextData();

  const currentMainComponent = useMemo(
    () => ComponentMap[sideBarOption]?.[subSideBarOption] || <>Not Found</>,
    [subSideBarOption]
  );

  return (
    <div 
      className="fixed left-[272px] top-14 h-[calc(100vh-40px)] w-[calc(100%-272px)] 
                bg-[#1E293B] border-l-4 border-[#FBBF24] shadow-xl rounded-lg"
    >
      <div className="bg-[#334155] h-full overflow-y-auto p-4 rounded-lg">
        <DocketContextProvider>
        {currentMainComponent}
        </DocketContextProvider>
      </div>
    </div>
  );
});

export default MainSpace;
