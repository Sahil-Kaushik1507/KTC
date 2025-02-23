import React, { useMemo } from "react";
import { useSideBarOptionsContextData } from "../../../Context/SideBarOptionsContext.jsx";

const MainSpace = React.memo(() => {
  const { sideBarOption, subSideBarOption } = useSideBarOptionsContextData();

  const componentMap = {
    Docket: {
      "New Docket": <>New Dockets</>,
      "View Docket": <>View Dockets</>,
      Welcome: <>Welcome</>,
    },
    Bill: {
      "New Bill": <>New Bill</>,
      "View Bill": <>View Bills</>,
      Welcome: <>Welcome</>,
    },
    Payment: {
      "New Payment": <>New Payment</>,
      "View Payment": <>View Payments</>,
      Welcome: <>Welcome</>,
    },
    Welcome: {
      Welcome: <>Welcome</>,
    },
  };

  const currentMainComponent = useMemo(
    () => componentMap[sideBarOption]?.[subSideBarOption] || <>Not Found</>,
    [ subSideBarOption] 
  );

  return (
    <div className="fixed left-[20%] h-full w-4/5 overflow-hidden bg-mycolors-primary-2 border-8 border-r- border-mycolors-secondary-2">
      <div className="bg-mycolors-primary-4 pt-0 h-full overflow-hidden rounded-lg overflow-y-auto">
        {currentMainComponent} 
      </div>
    </div>
  );
});

export default MainSpace;
