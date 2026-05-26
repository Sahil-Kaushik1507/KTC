import React from "react";

export default function Footer() {
  return (
    <div 
      className="footer fixed bottom-0 left-0 w-full h-[6vh] bg-[#1E293B] 
                 flex justify-between items-center text-[#CBD5E1] 
                 px-4 shadow-md"
    >
      <p className="ml-4 text-sm">
        &#169; All Rights Reserved - Kaushik Transport Company&#174;
      </p>

      <p className="mr-4 text-sm flex items-center">
        &#9743; 9720169680, 8077958775 &nbsp; &#9993; ktc.haridwar@gmail.com
      </p>
    </div>
  );
}
