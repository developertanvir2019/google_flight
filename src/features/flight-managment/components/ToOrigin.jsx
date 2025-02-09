/* eslint-disable no-unused-vars */
import { MapPin } from "lucide-react";
import { useState } from "react";
import useFetch from "../../../hook/useFetch";
import SingleFlightItem from "../../../components/ui/SingleFlight";
// eslint-disable-next-line react/prop-types
const ToOrigin = ({ setToOrigin }) => {
  const [origin, setOrigin] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  // search airports
  const {
    data: allAirports,
    loading: searchAirports,
    error: searchError,
  } = useFetch({
    endpoint: "/flights/searchAirport",
    params: {
      query: origin,
    },
  });

  return (
    <div className="relative">
      <div
        onClick={() => setShowOriginDropdown(true)}
        className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
      >
        <MapPin className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Where To?"
          className="bg-transparent text-white outline-none w-full"
        />
      </div>
      {showOriginDropdown && origin?.length > 0 && (
        <div className="absolute top-full w-[400px] left-0 right-0 mt-2 bg-gray-800 rounded-md shadow-lg z-50">
          <>
            {allAirports?.data?.length > 0 &&
              allAirports?.data?.map((or, i) => (
                <div
                  key={(origin, i)}
                  className="py-1 "
                  onClick={() => {
                    setOrigin(
                      origin?.navigation?.relevantHotelParams?.localizedName
                    ),
                      setToOrigin(or);
                  }}
                >
                  <SingleFlightItem
                    origin={or}
                    setShowOriginDropdown={setShowOriginDropdown}
                  />
                </div>
              ))}
          </>
        </div>
      )}
    </div>
  );
};

export default ToOrigin;
