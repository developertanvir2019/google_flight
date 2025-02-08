"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  MapPin,
  Search,
} from "lucide-react";

export default function FlightManage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("round");
  const [cabinClass, setCabinClass] = useState("economy");

  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [showTripTypeDropdown, setShowTripTypeDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  // Mock airports data - replace with actual API call
  const [airports, setAirports] = useState([
    { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International" },
    { code: "CGP", city: "Chittagong", name: "Shah Amanat International" },
    { code: "ZYL", city: "Sylhet", name: "Osmani International" },
  ]);

  // Get nearby airports on component mount
  useEffect(() => {
    // Mock getting nearby airports - replace with actual API call
    setOrigin("Dhaka");
  }, []);

  const handleSearch = () => {
    console.log({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      tripType,
      cabinClass,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-lg p-4 shadow-xl">
        {/* Top row selectors */}
        <div className="flex items-center gap-4 mb-4">
          {/* Trip Type Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTripTypeDropdown(!showTripTypeDropdown)}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="capitalize">{tripType} trip</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showTripTypeDropdown && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {["round", "one-way", "multi-city"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTripType(type);
                        setShowTripTypeDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left capitalize"
                    >
                      {type} trip
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Passengers Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <span>{passengers} Passenger</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showPassengersDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setPassengers(num);
                        setShowPassengersDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                    >
                      {num} Passenger{num > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cabin Class Selector */}
          <div className="relative">
            <button
              onClick={() => setShowClassDropdown(!showClassDropdown)}
              className="flex items-center gap-2 text-gray-300 hover:text-white"
            >
              <span className="capitalize">{cabinClass}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showClassDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {["economy", "premium economy", "business", "first"].map(
                    (cls) => (
                      <button
                        key={cls}
                        onClick={() => {
                          setCabinClass(cls);
                          setShowClassDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left capitalize"
                      >
                        {cls}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main inputs row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-2">
          {/* Origin Input */}
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
                  {airports.map((airport) => (
                    <button
                      key={airport.code}
                      onClick={() => {
                        setOrigin(airport.city);
                        setShowOriginDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                    >
                      <div>{airport.city}</div>
                      <div className="text-xs text-gray-500">
                        {airport.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <div
              onClick={() => setShowDestDropdown(true)}
              className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="bg-transparent text-white outline-none w-full"
              />
            </div>
            {showDestDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {airports.map((airport) => (
                    <button
                      key={airport.code}
                      onClick={() => {
                        setDestination(airport.city);
                        setShowDestDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-left"
                    >
                      <div>{airport.city}</div>
                      <div className="text-xs text-gray-500">
                        {airport.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
            onClick={handleSearch}
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
