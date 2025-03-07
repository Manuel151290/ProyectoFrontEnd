import React from 'react';

const Ticketera = ({ filteredTickets, sensores }) => {
  return (
    <main className="flex-grow flex flex-col items-center p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-6 text-center">
        Sistema de Ticketera y Sensores
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-6">
        {/* Tarjeta de Turnos */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Turnos en Espera</h2>
          {filteredTickets.length === 0 ? (
            <p className="text-gray-500">No hay turnos disponibles.</p>
          ) : (
            <ul className="space-y-3">
              {filteredTickets.map((ticket) => (
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
    </main>
  );
};

export default Ticketera;