import { useState } from "react";
import Avatar from "boring-avatars";

const Login = ({ onLogin, setLoginAttempted, loginAttempted }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
      {/* Espacio para avatar del trabajador */}
      <div className="mb-4 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center">
          <Avatar
            size={128}
            name={username || "default"}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
        <p className="text-gray-600 mt-2">Bienvenido</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-700 mb-4 hover:text-blue-600 transition-colors duration-300">
        Iniciar Sesión
      </h2>

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
      
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-800 transition transform active:scale-95"
      >
        Iniciar Sesión
      </button>

      {error && <p className="text-red-500 mt-2">Usuario o contraseña incorrectos</p>}

     {/* Opciones adicionales */}
     <div className="mt-4 text-sm text-gray-800 flex flex-col items-center center">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox w-6 h-6" />
              <span> Recuérdame</span>
            </label>
            <a href="#" className="mt-2 text-blue-600 cursor-pointer hover:underline">¿Olvidaste tu contraseña?</a>
     </div>
    </div>
  );
};

export default Login;