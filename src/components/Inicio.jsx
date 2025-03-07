import React, { useState, useEffect } from 'react';
import Header from './Header';
import { fetchTickets } from '../services/api';

const Inicio = ({ filteredTickets, sensores, startDate, endDate, searchText, timeOfDay, setStartDate, setEndDate, setSearchText, setTimeOfDay, handleFilter, page, setPage }) => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    fetchTickets(page).then((data) => setTickets(data.results));
  }, [page]);

  useEffect(() => {
    handleFilter();
  }, [tickets, startDate, endDate, searchText, timeOfDay]);

  const handleFilter = () => {
    const filtered = tickets.filter(ticket => {
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
    setFilteredTickets(filtered);
  };

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center p-4 md:p-6">
        {/* Formulario de Filtro */}
        <div className="mb-6 w-full max-w-5xl">
          <form className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label className="block text-gray-700">Fecha Inicio:</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Fecha Fin:</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Buscar:</label>
              <input 
                type="text" 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                className="border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Hora del Día:</label>
              <select 
                value={timeOfDay} 
                onChange={(e) => setTimeOfDay(e.target.value)} 
                className="border rounded p-2"
              >
                <option value="">Todos</option>
                <option value="morning">Mañana</option>
                <option value="afternoon">Tarde</option>
                <option value="night">Noche</option>
              </select>
            </div>
            <button 
              type="button" 
              onClick={handleFilter} 
              className="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Filtrar
            </button>
          </form>
        </div>

        {/* Grilla de Resultados */}
        <div className="w-full max-w-5xl mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Resultados Filtrados</h2>
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="py-4 px-4 border-b">Cliente</th>
                <th className="py-4 px-4 border-b">Tipo de Atención</th>
                <th className="py-4 px-4 border-b">Estado</th>
                <th className="py-4 px-4 border-b">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 px-4 text-center text-gray-500">No hay resultados disponibles.</td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-4 px-4 border-b">{ticket.cliente}</td>
                    <td className="py-4 px-4 border-b">{ticket.tipo_atencion}</td>
                    <td className="py-4 px-4 border-b">{ticket.estado}</td>
                    <td className="py-4 px-4 border-b">{new Date(ticket.fecha).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    </>
  );
};

export default Inicio;