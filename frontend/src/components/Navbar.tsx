"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLoggedIn } from "@/hooks/useLoggedIn";

const Navbar = ({ loggedIn }: { loggedIn: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLoggedIn();

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative sticky top-0">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        {!isOpen && (
          <Link href="/" className="text-xl font-bold">
            BlogWeb
          </Link>
        )}

        {/* If logged in, show these links */}
        {loggedIn && (
          <div className="hidden lg:flex gap-3 text-sm">
            <Link href="/home">Home</Link>
            <Link href="/add-posts">Add Posts</Link>
            <Link href="/my-posts">My Posts</Link>
            <button onClick={logout}>Logout</button>
          </div>
        )}

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer ml-auto lg:hidden"
        >
          {isOpen && loggedIn ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 z-50 flex flex-col gap-4 lg:hidden">
          {loggedIn && (
            <>
              <Link
                href="/home"
                className="text-gray-800 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                href="/add-posts"
                className="text-gray-800 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                Add Post
              </Link>
              <Link
                href="/my-posts"
                className="text-gray-800 hover:text-blue-600"
                onClick={handleLinkClick}
              >
                My Posts
              </Link>
              <button
                className="text-left text-gray-800 hover:text-red-600"
                onClick={() => {
                  handleLinkClick();
                  logout(); // Call logout on button click
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
