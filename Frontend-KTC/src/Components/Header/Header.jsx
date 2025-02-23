import React from 'react';

export default function Header() {
  return (
    <div className="nav-bar bg-mycolors-Lime_Green w-full flex items-center h-10 px-4 border-4">
      {/* Logo & Name (Left Corner) */}
      <div className="flex items-center space-x-2">
        <img src="./Images/logo/Logo-png-1.png" alt="Logo" className="h-10" />
        <h1 className="text-mycolors-Medium_Teal_Blue font-poppins text-2xl font-bold">
          Kaushik Transport Company&#174;
        </h1>
      </div>

      {/* Heading Line (Centered) */}
      <div className="flex-1 text-center">
        <p className="text-mycolors-Light_Pink font-mono text-xl font-bold">
          Your Goods, Our Priority
        </p>
      </div>

      {/* Navigation Buttons (Right, slightly away from edge) */}
      <div className="flex space-x-6 text-mycolors-secondary-1 font-semibold pr-20">
        <button className="hover:underline">Home</button>
        <button className="hover:underline">Login</button>
      </div>
    </div>
  );
}
