import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import useFetch from "../../../hook/useFetch";
import SingleFlightItem from "../../../components/ui/SingleFlight";
const FromOrigin = () => {
  const [origin, setOrigin] = useState({});
  const [totalAirports, setTotalAirports] = useState([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

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
  useEffect(() => {
    if (airports?.data) {
      setTotalAirports([airports?.data]);
      setOrigin(
        airports?.data?.current?.navigation?.relevantHotelParams?.localizedName
      );
    }
  }, [airports?.data]);

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

  //   useEffect(() => {
  //     if (allAirports?.data) {
  //       setTotalAirports([allAirports?.data]);
  //     }
  //   }, [allAirports?.data]);
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
          {totalAirports?.length > 0 &&
            totalAirports?.map((origin, i) => (
              <div key={i} className="py-1">
                <SingleFlightItem
                  origin={origin}
                  setShowOriginDropdown={setShowOriginDropdown}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FromOrigin;
