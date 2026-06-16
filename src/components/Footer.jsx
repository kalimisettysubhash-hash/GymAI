import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              GymAI
            </h2>

            <p className="text-gray-400 mt-4">
              AI-powered maintenance guide generator for gym equipment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/generator" className="hover:text-white">AI Guide Generator</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white">Guide History</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About Project</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>

            <div className="flex gap-5 text-2xl text-gray-400">
              <FaGithub className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
              <FaEnvelope className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mt-8 text-gray-400">
          <p>Contact us for help with your gym maintenance guides.</p>
          <p className="mt-2">Email: support@gymai.example</p>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-gray-500">
          (c) 2026 GymAI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
