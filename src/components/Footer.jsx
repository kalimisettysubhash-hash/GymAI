import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold">
            Gym
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              AI
            </span>
          </h2>
          <p className="mt-4 max-w-sm leading-7 text-gray-400">
            AI-powered maintenance guide generation for modern gym equipment operations.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/generator" className="hover:text-white">AI Guide Generator</Link></li>
            <li><Link to="/history" className="hover:text-white">Guide History</Link></li>
            <li><Link to="/about" className="hover:text-white">About Project</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Connect</h3>
          <div className="flex gap-4 text-2xl text-gray-400">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub className="transition hover:text-white" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="transition hover:text-white" />
            </a>
            <a href="mailto:support@gymai.example" aria-label="Email">
              <MdEmail className="transition hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-gray-500">
        Copyright 2026 GymAI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
