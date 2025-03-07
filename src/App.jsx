import { useState, useEffect } from "react";
import { fetchTickets, fetchSensores } from "./services/api";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserPanel from "./components/UserPanel";
import TicketPanel from "./components/TicketPanel";
import Ticketera from "./components/Ticketera";
import { Users, ClipboardList } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isTicketPanelOpen, setIsTicketPanelOpen] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets(page).then((data) => setTickets(data.results));
      fetchSensores(page).then((data) => setSensores(data.results));
    }
  }, [page, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setLoginAttempted(false); // Desactiva el movimiento del botón al iniciar sesión
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
    setIsTicketPanelOpen(false); // Cierra el panel de tickets si está abierto
  };

  const toggleTicketPanel = () => {
    setIsTicketPanelOpen(!isTicketPanelOpen);
    setIsUserPanelOpen(false); // Cierra el panel de usuarios si está abierto
  };

  const handleHome = () => {
    history.push("/inicio"); // Redirige a la página de inicio
  };

  const handleTicket = () => {
    history.push("/ticketera"); // Redirige a la página de ticketera
  };

  const handleFilter = () => {
    // Filtrar tickets y sensores basados en las fechas seleccionadas
    fetchTickets(page, startDate, endDate).then((data) => setTickets(data.results));
    fetchSensores(page, startDate, endDate).then((data) => setSensores(data.results));
  };

  const filteredTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.fecha);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate = (!start || ticketDate >= start) && (!end || ticketDate <= end);
    const matchesText = ticket.cliente.toLowerCase().includes(searchText.toLowerCase());
    const matchesTimeOfDay = timeOfDay === '' || (
      (timeOfDay === 'morning' && ticketDate.getHours() < 12) ||
      (timeOfDay === 'afternoon' && ticketDate.getHours() >= 12 && ticketDate.getHours() < 18) ||
      (timeOfDay === 'night' && ticketDate.getHours() >= 18)
    );
    return matchesDate && matchesText && matchesTimeOfDay;
  });

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {!isAuthenticated ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center mx-auto my-auto">
          <Login onLogin={handleLogin} setLoginAttempted={setLoginAttempted} loginAttempted={loginAttempted} />
          
          {/* Opciones adicionales */}
          <div className="mt-4 text-sm text-gray-800 flex flex-col items-center center">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-6 h-6" />
              <span> Recuérdame</span>
            </label>
            <a href="#" className="mt-2 text-blue-600 cursor-pointer hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      ) : (
        <>  
          <Header onLogout={handleLogout} onHome={handleHome} onTicket={handleTicket} />
          <Ticketera filteredTickets={filteredTickets} sensores={sensores} />
          {/* Menú Lateral */}
          <div className="fixed right-0 top-1/4 transform -translate-y-1/2 bg-blue-600 text-white rounded-l-lg shadow-lg">
            <div className="flex flex-col space-y-2 p-2">
              <button
                onClick={toggleUserPanel}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-700 transition rounded-l-lg"
              >
                <Users className="w-5 h-5" /> <span className="hidden md:inline">Gestión de Usuarios</span>
              </button>
              <button
                onClick={toggleTicketPanel}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-700 transition rounded-l-lg"
              >
                <ClipboardList className="w-5 h-5" /> <span className="hidden md:inline">Gestión de Tickets</span>
              </button>
            </div>
          </div>

          {/* Paneles */}
          <UserPanel isOpen={isUserPanelOpen} closePanel={toggleUserPanel} />
          <TicketPanel isOpen={isTicketPanelOpen} closePanel={toggleTicketPanel} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;