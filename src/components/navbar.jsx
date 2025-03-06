import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC9a90Kgze4H8Ug_82EvY5yBAA-qCGlXPXlA&s"
            className="h-10"
            alt="Nutrition Logo"
          />
          <span className="text-2xl font-bold text-white">Nutrition For You</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 text-white rounded-lg md:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:items-center`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 bg-white bg-opacity-20 md:bg-transparent rounded-lg md:mt-0">
            <li>
              <a
                href="/recherche"
                className="block py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300"
              >
                Search Food
              </a>
            </li>
            <li>
              <a
                href="/calcImc"
                className="block py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300"
              >
                Calculate IMC
              </a>
            </li>
            <li>
              <a
                href="/calcImg"
                className="block py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300"
              >
                Calculate IMG
              </a>
            </li>
            <li className="relative group">
              <ul className="flex items-center justify-between w-full py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300">
                More
             
              <div className="absolute left-0 mt-2 hidden bg-white text-gray-700 shadow-md rounded-lg w-40 group-hover:block">
                <a
                  href="/hiImc"
                  className="block px-4 py-2 hover:bg-green-500 hover:text-white transition duration-300"
                >
                  Check IMC
                </a>
                <a
                  href="/hiImg"
                  className="block px-4 py-2 hover:bg-green-500 hover:text-white transition duration-300"
                >
                  Check IMG
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white transition duration-300"
                >
                  Sign out
                </a>
              </div>
              </ul>
            </li>
            <li>
              <a
                href="/login"
                className="block py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/registre"
                className="block py-2 px-4 text-white font-semibold hover:bg-green-600 rounded-md transition duration-300"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
