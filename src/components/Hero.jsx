import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative px-6 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 mb-6">
            AI Powered Maintenance Assistant
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            AI Gym Equipment
            <span className="text-blue-500 block">Maintenance Generator</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Generate professional maintenance guides, safety recommendations and service schedules
            for gym equipment using AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/generator"
              className="bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300 text-white"
            >
              Generate Guide
            </Link>

            <Link
              to="/about"
              className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-xl text-white"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center md:justify-start md:-ml-8 lg:-ml-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-gray-900 border border-gray-700 rounded-3xl p-8 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-white text-xl font-semibold mb-4">
              Sample Maintenance Guide
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>- Clean treadmill belt daily</p>
              <p>- Lubricate every 3 months</p>
              <p>- Inspect motor weekly</p>
              <p>- Tighten loose screws monthly</p>
              <p>- Schedule servicing every 6 months</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
