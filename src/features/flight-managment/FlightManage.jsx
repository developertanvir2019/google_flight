"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, MapPin, Search } from "lucide-react";
import TopRow from "./components/TopRow";
import FromOrigin from "./components/FromOrigin";
import ToOrigin from "./components/ToOrigin";
import useFetch from "../../hook/useFetch";

export default function FlightManage() {
  const [fromOrigin, setFromOrigin] = useState({});
  const [toOrigin, setToOrigin] = useState({});
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("round");
  const [cabinClass, setCabinClass] = useState("economy");
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Mock airports data - replace with actual API call
  const [airports, setAirports] = useState([
    { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International" },
    { code: "CGP", city: "Chittagong", name: "Shah Amanat International" },
    { code: "ZYL", city: "Sylhet", name: "Osmani International" },
  ]);

  // Get nearby airports on component mount
  const [flights, setFlights] = useState([]);
  const handleSearchFlights = () => {
    console.log("object");
    if (
      fromOrigin?.skyId &&
      toOrigin?.skyId &&
      fromOrigin?.entityId &&
      toOrigin?.entityId &&
      departureDate
    ) {
      const { data: flightsData } = useFetch({
        endpoint: "/flights/searchFlights",
        params: {
          originSkyId: fromOrigin?.skyId,
          destinationSkyId: toOrigin.skyId,
          originEntityId: fromOrigin?.entityId,
          destinationEntityId: toOrigin.entityId,
          date: departureDate,
          returnDate: returnDate || undefined, // Optional
          adults: passengers,
          cabinClass,
        },
      });
      if (flightsData?.data) {
        setFlights(flightsData.data);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
        {/* Top row selectors */}
        <TopRow
          tripType={tripType}
          setTripType={setTripType}
          passengers={passengers}
          setPassengers={setPassengers}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
        />

        {/* Main inputs row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-2">
          {/* Origin Input */}

          <FromOrigin setFromOrigin={setFromOrigin} />

          {/* Destination Input */}
          <ToOrigin setToOrigin={setToOrigin} />

          {/* Date Picker */}
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

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSearchFlights}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
