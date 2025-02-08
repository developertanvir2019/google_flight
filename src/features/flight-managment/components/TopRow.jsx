/* eslint-disable react/prop-types */
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import Dropdown from "../../../components/ui/dropdown";

const TopRow = ({
  tripType,
  setTripType,
  passengers,
  setPassengers,
  cabinClass,
  setCabinClass,
}) => {
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [showTripTypeDropdown, setShowTripTypeDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  return (
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
          <Dropdown
            data={["round", "one-way"]}
            setData={setTripType}
            setShow={setShowTripTypeDropdown}
          />
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
          <Dropdown
            data={[1, 2, 3, 4, 5]}
            setData={setPassengers}
            setShow={setShowPassengersDropdown}
          />
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
          <Dropdown
            data={["economy", "premium economy", "business", "first"]}
            setData={setCabinClass}
            setShow={setShowClassDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default TopRow;
