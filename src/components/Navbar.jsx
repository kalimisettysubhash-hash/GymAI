import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent font-bold">
              GymAI
            </span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-400 font-medium">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <NavLink
                to={`#${link.id}`}
                className={({ isActive }) =>
                  isActive ? "text-blue-400 font-semibold" : "text-gray-300"
                }
              >
                {link.name}
              </NavLink>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <NavLink
          to="#generator"
          className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition duration-300"
        >
          Generate Tips
        </NavLink>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-700">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-400">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-blue-400 font-semibold" : "text-gray-400"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink
                to="#generator"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 px-5 py-2 rounded-lg text-white"
              >
                Generate Tips
              </NavLink>
            </li>
          </ul>
          <hr className="border-gray-700" />
        </div>
        
      )}
    </nav>
  );
};
export default Navbar;