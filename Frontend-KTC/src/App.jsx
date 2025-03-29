import React from "react";
import { SideBarOptionsContextProvider } from "./Context/SideBarOptionsContext.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import { DocketContextProvider } from "./Context/DocketContext.jsx";

function App() {
  return (
    <>
      <SideBarOptionsContextProvider>
        <DocketContextProvider>
        <Dashboard />
        </DocketContextProvider>
      </SideBarOptionsContextProvider>
    </>
  );
}

export default App;
