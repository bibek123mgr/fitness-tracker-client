// components/Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-black/90 border-b border-bronze-800/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-bronze-600 to-bronze-800 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Fitness<span className="text-bronze-500">Tracker</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">

            
            <NavLink 
              to="/goals" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition text-gray-300 hover:text-bronze-400 hover:bg-bronze-600/10'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Goals
              </div>
            </NavLink>
            
            <NavLink 
              to="/nutritions" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition text-gray-300 hover:text-bronze-400 hover:bg-bronze-600/10
                }`
              }
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
                Nutrition
              </div>
            </NavLink>
            
            <NavLink 
              to="/activities" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition text-gray-300 hover:text-bronze-400 hover:bg-bronze-600/10
                }`
              }
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Activities
              </div>
            </NavLink>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium">{user?.name || 'Athlete'}</p>
              <p className="text-bronze-400 text-xs">{user?.email}</p>
            </div>
            
            {/* User Avatar */}
            <div className="relative group">
              <button className="w-9 h-9 bg-gradient-to-br from-bronze-600 to-bronze-800 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-bronze-700/30 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-gray-800 mb-1">
                    <p className="text-white text-sm font-medium">{user?.name}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 border-t border-bronze-800/30 backdrop-blur-md z-50">
          <div className="flex justify-around py-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex flex-col items-center py-1 px-3 rounded-lg transition ${
                  isActive ? 'text-bronze-400' : 'text-gray-400'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </NavLink>
            
            <NavLink 
              to="/goals" 
              className={({ isActive }) => 
                `flex flex-col items-center py-1 px-3 rounded-lg transition ${
                  isActive ? 'text-bronze-400' : 'text-gray-400'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs mt-1">Goals</span>
            </NavLink>
            
            <NavLink 
              to="/nutrition" 
              className={({ isActive }) => 
                `flex flex-col items-center py-1 px-3 rounded-lg transition ${
                  isActive ? 'text-bronze-400' : 'text-gray-400'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <span className="text-xs mt-1">Food</span>
            </NavLink>
            
            <NavLink 
              to="/activities" 
              className={({ isActive }) => 
                `flex flex-col items-center py-1 px-3 rounded-lg transition ${
                  isActive ? 'text-bronze-400' : 'text-gray-400'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs mt-1">Workouts</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;