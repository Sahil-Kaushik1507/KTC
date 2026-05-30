import React from "react";

const ApiError = ({ error, refetch ,isFetching }) => {


    return (
        <div className="flex h-full w-full items-center justify-center bg-[#0F172A] px-4">
            <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#1E293B] p-6 shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                    <svg
                        className="h-7 w-7 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M4.93 19.07A10 10 0 1119.07 4.93 10 10 0 014.93 19.07z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="mt-4 text-center text-lg font-semibold text-red-400">
                    Something went wrong
                </h1>

                {/* Message */}
                <p className="mt-2 text-center text-sm text-slate-300 break-words">
                    {error || "Unexpected server error occurred"}
                </p>

                {/* Optional hint */}
                <p className="mt-3 text-center text-xs text-slate-500">
                    Please try again or contact support if the issue persists.
                </p>

                {/* Optional action area (future-ready) */}
                <div className="mt-5 flex justify-center">
                    <button
                        onClick={refetch}
                        disabled={isFetching}
                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition
                                     ${isFetching ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}
  `}
                    >
                        {isFetching ? "Retrying..." : "Retry"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ApiError);