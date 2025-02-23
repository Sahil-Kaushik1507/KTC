import React, { createContext, useContext, useState } from "react";

export const SideBarOptionsContext = createContext();

export const SideBarOptionsContextProvider = ({ children }) => {
  const [sideBarOption, setSideBarOption] = useState("Welcome");
  const [subSideBarOption, setSubSideBarOption] = useState("Welcome");

  return (
    <>
      <SideBarOptionsContext.Provider
        value={{
          sideBarOption,
          setSideBarOption,
          subSideBarOption,
          setSubSideBarOption,
        }}
      >
        {children}
      </SideBarOptionsContext.Provider>
    </>
  );
};

export function useSideBarOptionsContextData() {
  return useContext(SideBarOptionsContext);
}
