import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user,isAuth } = useContext(UserContext);

  const closeSidebar = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-lg flex justify-between items-center px-4 py-2 md:px-6">
      {/* Logo Section */}
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center">
          <img src="/pinterestLogo.jpg" alt="Pinterest" className="h-12" />
          <span className="text-xl font-semibold text-red-600 ml-2">
            Pinterest
          </span>
        </NavLink>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink to="/" className="text-gray-700 hover:text-black">
          Home
        </NavLink>
        <NavLink to="/create" className="text-gray-700 hover:text-black">
          Create
        </NavLink>
       {isAuth && <NavLink
          to="/account"
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold"
        >
           {user?.username?.slice(0, 1)}
        </NavLink>}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-2xl text-gray-700"
      >
        <FiMenu />
      </button>

      {/* Overlay (closes menu when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed w-screen  top-0 left-0  h-full bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-2xl text-gray-700"
        >
          <FiX />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col items-start space-y-6 p-6 pt-16">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-black text-lg"
            onClick={closeSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className="text-gray-700 hover:text-black text-lg"
            onClick={closeSidebar}
          >
            Create
          </NavLink>
          <NavLink
            to="/account"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold"
            onClick={closeSidebar}
          >
            {isAuth ? user?.username?.slice(0, 1) : "U" }
            
          </NavLink>
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
