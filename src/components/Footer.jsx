import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 text-center mt-6">
      <p>© 2025 ProyectoFrontEnd - Todos los derechos reservados</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="https://github.com/" target="_blank" className="hover:text-gray-400 transition">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/" target="_blank" className="hover:text-gray-400 transition">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:correo@example.com" className="hover:text-gray-400 transition">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
