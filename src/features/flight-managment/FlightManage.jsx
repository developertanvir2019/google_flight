"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Search } from "lucide-react";
import TopRow from "./components/TopRow";
import FromOrigin from "./components/FromOrigin";
import ToOrigin from "./components/ToOrigin";
import useFetch from "../../hook/useFetch";
import FlightDetails from "./components/FlightDetails";

export default function FlightManage() {
  const [fromOrigin, setFromOrigin] = useState({});
  const [toOrigin, setToOrigin] = useState({});
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("round");
  const [cabinClass, setCabinClass] = useState("economy");
  const [searchParams, setSearchParams] = useState(null);
  const {
    data: flightsData,
    error,
    loading,
  } = useFetch({
    endpoint: searchParams ? "/flights/searchFlights" : null,
    params: searchParams || {},
  });

  useEffect(() => {
    if (flightsData?.data) {
      console.log("Flights Found:", flightsData.data);
    }
  }, [flightsData]);

  const handleSearchFlights = () => {
    const formattedDepartureDate = departureDate.toISOString().split("T")[0];
    const formattedReturnDate = returnDate
      ? returnDate.toISOString().split("T")[0]
      : undefined;
    if (
      fromOrigin?.skyId &&
      toOrigin?.skyId &&
      fromOrigin?.entityId &&
      toOrigin?.entityId &&
      departureDate
    ) {
      setSearchParams({
        originSkyId: fromOrigin.skyId,
        destinationSkyId: toOrigin.skyId,
        originEntityId: fromOrigin.entityId,
        destinationEntityId: toOrigin.entityId,
        date: formattedDepartureDate,
        returnDate: formattedReturnDate || undefined,
        adults: passengers,
        cabinClass,
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
        <TopRow
          tripType={tripType}
          setTripType={setTripType}
          passengers={passengers}
          setPassengers={setPassengers}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-2">
          <FromOrigin setFromOrigin={setFromOrigin} />
          <ToOrigin setToOrigin={setToOrigin} />

          <div className="flex items-center bg-gray-800 rounded-lg p-4">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex gap-4">
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                placeholderText="Departure"
                className="bg-transparent text-white outline-none cursor-pointer"
                dateFormat="MMM d, yyyy"
              />
              {tripType === "round" && (
                <>
                  <div className="text-gray-500">|</div>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    placeholderText="Return"
                    className="bg-transparent text-white outline-none cursor-pointer"
                    dateFormat="MMM d, yyyy"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSearchFlights}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            {loading ? "Searching..." : "Explore"}
          </button>
        </div>

        {/* Display Flights */}
        <div className="mt-4 text-white">
          {loading ? (
            <div>
              <p>Loading......</p>
            </div>
          ) : (
            <>
              {flightsData?.data?.itineraries?.length > 0 ? (
                <div>
                  {flightsData.data.itineraries.map((flight) => (
                    <div
                      key={flight?.id}
                      className="p-2 bg-gray-700 my-2 rounded "
                    >
                      {/* <p>Flight: {flight.name}</p>
                      <p>Price: {flight.price}</p> */}
                      <FlightDetails flight={flight} />
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p>No flights found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
