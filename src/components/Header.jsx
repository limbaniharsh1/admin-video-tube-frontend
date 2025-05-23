import React, { useEffect, useRef, useState } from "react";
import { Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../constants/routes";
import { useDispatch } from "react-redux";
import { clearToken } from "../store/auth/slice";

export default function Header({ onAddClick, btnContent }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearToken());
    dispatch({ type: "RESET_STORE" });
    nav(routeConstants.LOGIN);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Video Library
        </h1>
        <span className="flex items-center gap-4">
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">
              {btnContent || "Add Video"}
            </span>
          </button>
          <div className="relative" ref={dropdownRef}>
            <Menu
              className="cursor-pointer text-white"
              onClick={toggleDropdown}
            />

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-5 w-48 bg-white rounded-md shadow-lg transition-all duration-200 origin-top-right transform ${
                dropdownOpen
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <ul className="py-2 text-gray-700 select-none">
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </span>
      </div>
    </header>
  );
}
