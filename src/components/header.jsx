import React from 'react';
import { Home, ClipboardList, Activity, LogOut } from "lucide-react";

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
    history.push("/login"); // Redirige a la página de inicio de sesión
  };

  const handleTicket = () => {
    history.push("/ticketera"); // Redirige a la página de ticketera
  };

  const handleHome = () => {
    history.push("/inicio"); // Redirige a la página de inicio
  };
  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          ProyectoFrontEnd
        </h1>
        <nav>
          <ul className="flex gap-6">
            <li className="flex items-center gap-2 hover:underline" onClick={handleHome}>
              <Home className="w-5 h-5" /> Inicio
            </li>
            <li className="flex items-center gap-2 hover:underline" onClick={handleTicket}>
              <ClipboardList className="w-5 h-5" /> Ticketera
            </li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-5 h-5" /> Logout
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;