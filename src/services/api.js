const BASE_URL = "https://api.banco-plc.com"; // Simulación de URL base

// Obtener turnos de la ticketera bancaria
export const fetchTickets = async (page = 1) => {
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(`${BASE_URL}/tickets?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { results: data.tickets };
  } catch (error) {
    console.error("Error al obtener los tickets:", error);
    return { results: [] };
  }
};

// Obtener datos de sensores del PLC
export const fetchSensores = async (page = 1) => {
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(`${BASE_URL}/sensores?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { results: data.sensores };
  } catch (error) {
    console.error("Error al obtener los sensores:", error);
    return { results: [] };
  }
};
