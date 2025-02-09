/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

export default function FlightDetails({ flight }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className=" md:max-w-4xl w-full  mx-auto">
      <div className="bg-gray-900 rounded-lg ">
        {/* Top section */}
        <div
          className="border-t border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="md:p-4 p-2 md:overflow-hidden overflow-x-scroll flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2 md:gap-4">
              <img
                src={flight?.legs?.[0]?.carriers?.marketing?.[0]?.logoUrl}
                alt="Airline Logo"
                className="h-8 w-8"
              />
              <div className="min-w-[150px]">
                <h2 className="text-white md:text-base text-xs font-medium">
                  {flight?.legs?.[0]?.arrival?.split("T")?.[0]}{" "}
                  <span className="font-bold text-xl pe-1">↔</span>
                  {flight?.legs?.[0]?.departure?.split("T")?.[0]}
                </h2>
                <p className="md:text-base text-xs">
                  {flight?.legs?.[0]?.carriers?.marketing?.[0]?.name}
                </p>
              </div>
              <div className="text-center min-w-[130px]">
                <div className="text-white md:text-base text-xs font-medium">
                  {flight?.legs?.[0]?.durationInMinutes} Minutes
                </div>
                <div className="text-gray-400 md:text-base text-xs">
                  {flight?.legs?.[0]?.origin?.displayCode} -
                  {flight?.legs?.[0]?.destination?.displayCode}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 min-w-[300px]">
              <div className="text-right">
                <div className="text-white ms-5 md:ms-0 text-base text-nowrap font-medium">
                  {" "}
                  Non Stop
                </div>
              </div>
              <button className="bg-gray-800 text-xs md:text-base text-nowrap text-blue-400 px-3 md:px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Select flight
              </button>

              <div className="text-right">
                <div className="text-white text-base font-medium">Price</div>
                <div className="text-gray-400">{flight?.price?.formatted}</div>
              </div>
              <ChevronUp
                className={`w-5 h-5 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Expanded content */}
          <div
            className={`md:overflow-hidden overflow-x-scroll transition-all duration-300 ${
              isExpanded ? "max-h-96 p-4" : "max-h-0"
            }`}
          >
            {/* Main flight info section */}
            <div className="p-3 md:p-6 flex justify-between gap-3 md:gap-6">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-start gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <div className="w-0.5 h-16 bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                  </div>

                  {/* Flight times and locations */}
                  <div className="flex items-center md:text-lg text-sm">
                    <div className="mb-8 ">
                      <div className="text-white ">
                        {" "}
                        {flight?.legs?.[0]?.arrival?.split("T")?.[0]} -{" "}
                      </div>
                      <div className="text-gray-400">
                        {flight?.legs?.[0]?.origin?.name} (
                        {flight?.legs?.[0]?.origin?.displayCode})
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="text-white ">
                        {" "}
                        {flight?.legs?.[0]?.departure?.split("T")?.[0]}
                      </div>
                      <div className="text-gray-400">
                        {flight?.legs?.[0]?.destination?.name} ({" "}
                        {flight?.legs?.[0]?.destination?.displayCode})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side info */}
              <div className="flex flex-col gap-4 text-right min-w-[200px] me-5 md:me-auto">
                <div className="flex items-center justify-end gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M12 4v16" />
                  </svg>
                  Average legroom (30 in)
                </div>
                <div className="flex items-center justify-end gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12M6 12h12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
