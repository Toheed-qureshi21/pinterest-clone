import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { UserContext } from "../context/UserContext";
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuth } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const q = params.get("q") || "";
    setQuery(q);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <header
      className={`bg-white relative shadow-lg flex justify-between items-center px-4 py-4 md:px-6 lg:px-12 md:sticky md:top-0 z-50`}
    >

      <div className="flex items-center">
        <NavLink to="/" className="flex items-center">
          <img src="/pinterestLogo.jpg" alt="Pinterest" className="h-12" />
          <span className="text-xl font-bold text-red-600 ml-2">
            Pinterest
          </span>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/"
          className="text-gray-700 hover:text-black font-bold"
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className="text-gray-700 hover:text-black font-bold"
        >
          Create
        </NavLink>
          {
            !isAuth &&   <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="common-input relative"
              style={{}}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-[16rem] bg-white"
            >
              <FaSearch className="text-lg text-gray-500 font-light" />
            </button>
          </form>
          }
      
        {isAuth && (
          <NavLink
            to="/account"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold"
          >
            {user?.username?.slice(0, 1)}
          </NavLink>
        )}
        {!isAuth && (
          <>
            <NavLink
              to="/login"
              className="bg-red-600 text-white font-semibold px-3 py-2 rounded-2xl hover:bg-red-700 hover:cursor-pointer transition-all duration-300"
            >
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className="bg-gray-200 font-semibold py-2 px-4 rounded-2xl hover:bg-gray-300 hover:cursor-pointer transition-all duration-300"
            >
              Sign up
            </NavLink>
          </>
        )}

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

   
   
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed w-screen top-0 left-0 h-full bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-2xl text-gray-700"
        >
          <FiX />
        </button>

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
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded-l-md focus:outline-none flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {isAuth && (
            <NavLink
              to="/account"
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold"
              onClick={closeSidebar}
            >
              {user?.username?.slice(0, 1)}
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
