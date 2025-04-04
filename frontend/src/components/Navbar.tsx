"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        {!isOpen && (
          <Link href="/home" className="text-xl font-bold">
            BlogWeb
          </Link>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer ml-auto"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 z-50 flex flex-col gap-4">
          <Link
            href="/add-posts"
            className="text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick} // Close the menu on click
          >
            Add Post
          </Link>
          <Link
            href="/my-posts"
            className="text-gray-800 hover:text-blue-600"
            onClick={handleLinkClick} // Close the menu on click
          >
            My Posts
          </Link>
          <button
            className="text-left text-gray-800 hover:text-red-600"
            onClick={handleLinkClick} // Close the menu on click
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
