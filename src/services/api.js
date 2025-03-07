const BASE_URL = "https://67c7c4b6c19eb8753e7aa8ea.mockapi.io/api/ticket"; 
const BASE_USUARIOS = "https://67cae0153395520e6af376ba.mockapi.io/usuarios"; 
// Obtener turnos de la ticketera bancaria
export const fetchTickets = async (page = 1) => {
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const response = await fetch(`${BASE_URL}/ticketera?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { results: Array.isArray(data) ? data : [] };
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
    const response = await fetch(`${BASE_URL}/sensor?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { results: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("Error al obtener los sensores:", error);
    return { results: [] };
  }
};

// Obtener usuarios
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_USUARIOS}/users`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};

// Crear usuario
export const createUser = async (name) => {
  try {
    const response = await fetch(`${BASE_USUARIOS}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });
    return await response.json();
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return null;
  }
};

// Editar usuario
export const updateUser = async (id, name) => {
  try {
    const response = await fetch(`${BASE_USUARIOS}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return null;
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    await fetch(`${BASE_USUARIOS}/users/${id}`, {
      method: "DELETE"
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};