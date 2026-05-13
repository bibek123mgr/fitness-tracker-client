import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Goals from './pages/Goals';
import Nutrition from './pages/Nutrition';
import Activities from './pages/Activities';
import Header from './components/Header';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    setIsAuthenticated(false);

  };

  // Wait until auth check finishes
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (

    <BrowserRouter>

      <Header onLogout={handleLogout} />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/goals" />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated
              ? <Navigate to="/goals" />
              : <Signup />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/goals"
          element={
            isAuthenticated
              ? <Goals />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/activities"
          element={
            isAuthenticated
              ? <Activities />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/nutritions"
          element={
            isAuthenticated
              ? <Nutrition />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;