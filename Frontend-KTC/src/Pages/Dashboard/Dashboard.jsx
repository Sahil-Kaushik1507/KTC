import React from "react";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import SubSideBar from "../../Components/SubSideBar/SubSideBar";
import MainSpace from "../Dashboard/MainSpace.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

const Dashboard = React.memo(() => {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-md">
        <Header />
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex flex-col bg-white shadow-md">
          <SideBar />
        </aside>

        {/* Sub Sidebar */}
        <aside className="flex flex-col bg-white shadow-md">
          <SubSideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 shadow-inner">
            <MainSpace/>
        </main>

        <footer className="flex-1 overflow-auto bg-gray-50 p-6 shadow-inner">
          <Footer/>
        </footer>
      </div>
    </div>
  );
});

export default Dashboard;
