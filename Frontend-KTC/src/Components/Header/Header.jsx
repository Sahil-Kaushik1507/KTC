import React from 'react';

export default function Header() {
  return (
    <div className="nav-bar bg-[#1E3A8A] w-full flex items-center h-14 px-6 border-b-4 border-[#FBBF24] shadow-lg">
      {/* Logo & Name (Left Corner) */}
      <div className="flex items-center space-x-3">
        <img src="./Images/logo/Logo-jpg-1.jpg" alt="Logo" className="h-12 rounded-xl" />
        <h1 className="text-[#F8FAFC] font-poppins text-2xl font-bold">
          Kaushik Transport Company&#174;
        </h1>
      </div>

      {/* Heading Line (Centered) */}
      <div className="flex-1 text-center">
        <p className="text-[#FBBF24] font-mono text-xl font-semibold">
          Your Goods, Our Priority
        </p>
      </div>

      {/* Navigation Buttons (Right, slightly away from edge) */}
      <div className="flex space-x-6 text-[#38BDF8] font-semibold pr-20">
        <button className="hover:text-[#E0F2FE] transition duration-300">Home</button>
        <button className="hover:text-[#E0F2FE] transition duration-300">Login</button>
      </div>
    </div>
  );
}
