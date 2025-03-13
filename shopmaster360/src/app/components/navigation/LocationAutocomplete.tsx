// "use client";

// import { useState } from "react";

// const locations = [
//   "New York",
//   "Los Angeles",
//   "Chicago",
//   "Houston",
//   "Phoenix",
//   "Philadelphia",
//   "San Antonio",
// ];

// export default function LocationPopover() {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-48 px-4 py-2 rounded-full focus:outline-none focus:border-primary"
//       >
//         {selectedLocation || "Select Location"}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
//           <ul className="max-h-60 overflow-y-auto">
//             {locations.map((location, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSelectedLocation(location);
//                   setIsOpen(false);
//                 }}
//               >
//                 {location}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
];

export default function LocationAutocomplete() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("preferredLocation");
    if (savedLocation) setSelectedLocation(savedLocation);
  }, []);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    localStorage.setItem("preferredLocation", location);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-48">
      <div className="relative">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery || selectedLocation}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          placeholder="Select location"
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-primary text-sm"
          aria-label="Select delivery location"
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {filteredLocations.map((location) => (
              <li
                key={location}
                onMouseDown={() => handleLocationSelect(location)}
                className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                {location}
              </li>
            ))}
            {filteredLocations.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">
                No locations found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
