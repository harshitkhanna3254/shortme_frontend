import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, isAuthenticated, contextLogout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const loggedIn = isAuthenticated(); // Call it here

  function handleLogout() {
    contextLogout();
    navigate("/login");
  }

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  ShortenMe
                </span>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-green-500 font-semibold">
                Home
              </Link>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3">
            {loggedIn ? (
              <>
                <Link
                  to="/analytics"
                  className="py-4 px-2 text-green-500 font-semibold"
                >
                  Analytics
                </Link>
                <Link
                  to="/subscriptions"
                  className="py-4 px-2 text-green-500 font-semibold"
                >
                  Subscriptions
                </Link>

                <button
                  onClick={handleLogout}
                  className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
