import React from "react";
import Header from "./Components/Header/Header";
import SideBar from "./Components/Dashboard/SideBar/SideBar.jsx";
import SubSideBar from "./Components/Dashboard/SubSideBar/SubSideBar.jsx";
import { SideBarOptionsContextProvider } from "./Context/SideBarOptionsContext.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";

function App() {
  return (
    <>
      <SideBarOptionsContextProvider>
        <Dashboard />
      </SideBarOptionsContextProvider>
    </>
  );
}

export default App;
