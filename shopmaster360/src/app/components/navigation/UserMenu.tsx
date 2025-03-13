"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserMenu({ userName }: { userName: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userName) {
    return (
      <Link
        href="/signin"
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition-colors text-sm"
      >
        <UserCircleIcon className="w-5 h-5" />
        <span className="hidden md:inline">Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserCircleIcon className="w-6 h-6 text-gray-600" />
        <span className="hidden md:inline text-sm font-medium truncate max-w-[120px]">
          {userName}
        </span>
        <ChevronDownIcon className="hidden md:block w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-30">
          <Link
            href="/account"
            className="px-4 py-2 text-sm hover:bg-gray-50 block"
            onClick={() => setIsOpen(false)}
          >
            My Account
          </Link>
          <Link
            href="/orders"
            className="px-4 py-2 text-sm hover:bg-gray-50 block"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </Link>
          <Link
            href="/signout"
            className="px-4 py-2 text-sm hover:bg-gray-50 block text-red-600"
            onClick={() => setIsOpen(false)}
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
}
