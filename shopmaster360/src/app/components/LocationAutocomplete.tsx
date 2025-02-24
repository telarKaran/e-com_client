"use client";

import { useState } from "react";

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
];

export default function LocationPopover() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 px-4 py-2 rounded-full focus:outline-none focus:border-primary"
      >
        {selectedLocation || "Select Location"}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-y-auto">
            {locations.map((location, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsOpen(false);
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
