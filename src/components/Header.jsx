import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-black/90 border-b border-bronze-800/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-white font-bold text-xl">
            Fitness<span className="text-bronze-500">Tracker</span>
          </div>

          {/* NAV LINKS (ONLY IF LOGGED IN) */}
          {token && (
            <div className="hidden md:flex items-center gap-3">

              <NavLink
                to="/goals"
                className="text-gray-300 hover:text-bronze-400 px-3 py-2"
              >
                Goals
              </NavLink>

              <NavLink
                to="/nutritions"
                className="text-gray-300 hover:text-bronze-400 px-3 py-2"
              >
                Nutrition
              </NavLink>

              <NavLink
                to="/activities"
                className="text-gray-300 hover:text-bronze-400 px-3 py-2"
              >
                Activities
              </NavLink>

            </div>
          )}

          {/* AUTH BUTTON */}
          <div className="flex items-center gap-3">

            {!token ? (
              <>
                <NavLink to="/" className="text-white">Login</NavLink>
                <NavLink to="/signup" className="text-white">Signup</NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded text-white"
              >
                Logout
              </button>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Header;