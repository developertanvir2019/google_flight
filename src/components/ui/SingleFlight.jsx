/* eslint-disable react/prop-types */
import { MapPin, Plane, ChevronUp } from "lucide-react";

export default function SingleFlightItem({ origin, setShowOriginDropdown }) {
  console.log("tanvir", origin);
  return (
    <div
      onClick={() => {
        setShowOriginDropdown(false);
      }}
      className="bg-gray-800 w-full hover:bg-gray-700 cursor-pointer p-4 rounded-lg transition-colors"
    >
      <div className="flex  items-start gap-3">
        <div className="mt-1">
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1">
          {/* City and Country */}
          <div className="flex items-center justify-between">
            <div className="text-white text-lg font-medium">
              {origin?.current
                ? origin?.current?.navigation?.relevantHotelParams
                    ?.localizedName
                : origin?.navigation?.relevantHotelParams?.localizedName}{" "}
              ,{" "}
              {origin?.current
                ? origin?.current?.presentation?.subtitle
                : origin?.presentation?.subtitle}
            </div>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>

          {/* Subtitle */}
          <div className="text-gray-400 text-sm mb-3 text-start">
            Capital of{" "}
            {origin?.current
              ? origin?.current?.presentation?.subtitle
              : origin?.presentation?.subtitle}
          </div>

          {/* Airport Info */}
          <div className="flex items-center gap-3 text-gray-300">
            <Plane className="w-4 h-4" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>
                  {origin?.current
                    ? origin?.current?.presentation?.title
                    : origin?.presentation?.title}
                </span>
                <span className="text-gray-500 text-sm">
                  {origin?.current ? origin?.current?.skyId : origin?.skyId}
                </span>
              </div>
              {/* {distance && <div className="text-gray-500 text-sm">{distance} to destination</div>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
