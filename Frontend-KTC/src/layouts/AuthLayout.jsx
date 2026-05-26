import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1E293B]">
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div
          className="flex w-full max-w-7xl items-center justify-between gap-10 
                     rounded-3xl border border-gray-700 bg-[#334155]/80 p-10 
                     shadow-2xl backdrop-blur-sm"
        >
          {/* Left Side Image */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div
              className="overflow-hidden rounded-3xl border border-[#0F766E] 
                         shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src="./Images/logo/Logo-jpg-1.jpg"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex flex-1 justify-center ">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}