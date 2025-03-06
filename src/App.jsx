import { useState, useEffect } from "react";
import { fetchTickets, fetchSensores } from "./services/api";
import Login from "./components/Login";
import Header from "./components/header";
import Footer from "./components/Footer";
import UserPanel from "./components/UserPanel";
import TicketPanel from "./components/TicketPanel";
import { Users, ClipboardList } from "lucide-react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isTicketPanelOpen, setIsTicketPanelOpen] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTickets(page).then((data) => setTickets(data.results));
    fetchSensores(page).then((data) => setSensores(data.results));
  }, [page]);

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
          <main className="flex-grow flex flex-col items-center p-4 md:p-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-6 text-center">
              Sistema de Ticketera y Sensores
            </h1>

            {/* Contenedor de tarjetas */}
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
              {/* Tarjeta de Turnos */}
              <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Turnos en Espera</h2>
                {tickets.length === 0 ? (
                  <p className="text-gray-500">Cargando turnos...</p>
                ) : (
                  <ul className="space-y-3">
                    {tickets.map((ticket) => (
                      <li key={ticket.id} className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                        <span className="font-semibold">{ticket.cliente}</span> - {ticket.tipo_atencion} 
                        <span className={`ml-2 px-2 py-1 text-sm rounded ${ticket.estado === "En espera" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                          {ticket.estado}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Tarjeta de Sensores */}
              <section className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Opiniones Cliente (Sensor Analisis)</h2>
                {sensores.length === 0 ? (
                  <p className="text-gray-500">Cargando sensores...</p>
                ) : (
                  <ul className="space-y-3">
                    {sensores.map((sensor) => (
                      <li key={sensor.id} className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                        <span className="font-semibold">{sensor.ubicacion}</span> - {sensor.estado} 
                        <span className="ml-2 text-sm text-gray-600">({sensor.valor})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {/* Controles de Paginación */}
            <nav className="flex gap-4 mt-6">
              <button 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Anterior
              </button>
              <span className="text-lg font-semibold bg-white shadow px-4 py-2 rounded-lg">{page}</span>
              <button 
                onClick={() => setPage((prev) => prev + 1)} 
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Siguiente
              </button>
            </nav>
          </main>

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