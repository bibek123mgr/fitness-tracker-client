import { useState } from 'react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Goals from './pages/Goals';
import Nutrition from './pages/Nutrition';
import Activities from './pages/Activities';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/nutritions" element={<Nutrition />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
