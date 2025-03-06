import React, { useState } from "react";
import { Home, ClipboardList, Activity, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Título y logo */}
        <h1 className="text-xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          ProyectoFrontEnd
        </h1>

        {/* Botón menú hamburguesa en móviles */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Menú de navegación */}
        <nav
          className={`absolute top-16 left-0 w-full bg-blue-600 md:static md:w-auto transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-6 p-4 md:p-0">
            <li
              className="flex items-center gap-2 py-2 md:py-0 hover:underline cursor-pointer"
              onClick={handleHome}
            >
              <Home className="w-5 h-5" /> Inicio
            </li>
            <li
              className="flex items-center gap-2 py-2 md:py-0 hover:underline cursor-pointer"
              onClick={handleTicket}
            >
              <ClipboardList className="w-5 h-5" /> Ticketera
            </li>
            <li
              className="flex items-center gap-2 py-2 md:py-0 hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" /> Logout
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
