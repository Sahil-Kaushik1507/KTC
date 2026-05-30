import React from "react";

const Loader = ({ size = "h-12 w-12", text = "Loading..." , overlay = false}) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0F172A]">
      
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#1E293B] px-8 py-6 shadow-2xl">
        
        {/* Spinner */}
        <div
          className={`${size} animate-spin rounded-full border-4 border-sky-400 border-t-transparent`}
          role="status"
          aria-label="Loading"
        />

        {/* Text */}
        <p className="text-sm font-medium tracking-wide text-slate-300">
          {text}
        </p>

        {/* subtle pulse indicator */}
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 delay-150" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 delay-300" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Loader);