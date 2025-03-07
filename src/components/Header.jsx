import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Activity, LogOut } from "lucide-react";

const Header = ({ onLogout }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  const handleTicket = () => {
    navigate("/ticketera"); // Redirige a la página de ticketera
  };

  const handleHome = () => {
    navigate("/inicio"); // Redirige a la página de inicio
  };

  const isMobile = windowWidth < 768;

  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          {!isMobile && 'ProyectoFrontEnd'}
        </h1>
        <nav>
          <ul className="flex gap-6">
            <li className="flex items-center gap-2 hover:underline cursor-pointer" onClick={handleHome}>
              <Home className="w-5 h-5" /> {!isMobile && 'Inicio'}
            </li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer" onClick={handleTicket}>
              <ClipboardList className="w-5 h-5" /> {!isMobile && 'Ticketera'}
            </li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-5 h-5" /> {!isMobile && 'Logout'}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;