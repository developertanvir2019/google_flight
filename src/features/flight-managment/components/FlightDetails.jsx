/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

export default function FlightDetails({ flight }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {/* Top section */}

        {/* Expandable section */}
        <div
          className="border-t border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="p-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-4">
              <img
                src={flight?.legs?.[0]?.carriers?.marketing?.[0]?.logoUrl}
                alt="Airline Logo"
                className="h-8 w-8"
              />
              <div>
                <h2 className="text-white text-lg font-medium">
                  {flight?.legs?.[0]?.arrival?.split("T")?.[0]} -{" "}
                  {flight?.legs?.[0]?.departure?.split("T")?.[0]}
                </h2>
                <p>{flight?.legs?.[0]?.carriers?.marketing?.[0]?.name}</p>
              </div>
              <div className="text-right">
                <div className="text-white text-lg font-medium">
                  {flight?.legs?.[0]?.durationInMinutes}
                </div>
                <div className="text-gray-400">
                  {flight?.legs?.[0]?.origin?.displayCode} -
                  {flight?.legs?.[0]?.destination?.displayCode}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-white text-lg font-medium"> Non Stop</div>
              </div>
              <button className="bg-gray-800 text-blue-400 px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Select flight
              </button>

              <div className="text-right">
                <div className="text-white text-lg font-medium">Price</div>
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
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-96 p-4" : "max-h-0"
            }`}
          >
            {/* Main flight info section */}
            <div className="p-6 flex justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <div className="w-0.5 h-16 bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                  </div>

                  {/* Flight times and locations */}
                  <div className="flex items-center">
                    <div className="mb-8">
                      <div className="text-white text-xl">
                        {" "}
                        {flight?.legs?.[0]?.arrival?.split("T")?.[0]} -{" "}
                      </div>
                      <div className="text-gray-400">
                        {flight?.legs?.[0]?.origin?.name} (
                        {flight?.legs?.[0]?.origin?.displayCode})
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="text-white text-xl">
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
              <div className="flex flex-col gap-4 text-right">
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
