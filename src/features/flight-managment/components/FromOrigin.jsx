import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../../../hook/useFetch";
const FromOrigin = () => {
  const [origin, setOrigin] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  console.log(origin);

  const [coords, setCoords] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);
  const {
    data: airports,
    loading,
    error,
  } = useFetch({
    endpoint: "/flights/getNearByAirports",
    params: coords,
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
          placeholder="From where?"
          className="bg-transparent text-white outline-none w-full"
        />
      </div>
      {showOriginDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-md shadow-lg z-50">
          <div className="py-1">
            {/* {airports.map((airport) => (
              <button
                key={airport.code}
                onClick={() => {
                  setOrigin(airport.city);
                  setShowOriginDropdown(false);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
              >
                <div>{airport.city}</div>
                <div className="text-xs text-gray-500">{airport.name}</div>
              </button>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FromOrigin;
