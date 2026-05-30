import useAuth from "../features/auth/hooks/useAuth";
import Header from "./components/Header.jsx"
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/sidebar/Sidebar.jsx";
import SubSidebar from "./components/sidebar/SubSidebar.jsx";


export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-[95vh] w-full flex-col overflow-hidden">
      {/* Header */}
      <header className="w-full bg-white shadow-md">
        <Header />
      </header>

      {/* Main Layout */}
      <div className="flex h-full  ">
        {/* Sidebar */}
        <aside className="flex flex-col bg-white shadow-md">
         <SideBar/>
        </aside>

        {/* Sub Sidebar */}
        <aside className="flex flex-col bg-white shadow-md">
         <SubSidebar/>
        </aside>

        {/* Main Content */}
        <main className="w-full overflow-y-auto  bg-gray-50 ">
            {/* <MainSpace/> */}
            <Outlet/>
          
        </main>
      </div>

       <footer>
          <Footer/>
        </footer>
    </div>
  );
}