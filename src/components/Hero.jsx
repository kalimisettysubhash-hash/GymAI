import { motion } from "framer-motion";
import { FaCheckCircle, FaFilePdf, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const sampleItems = [
  "Wipe belt, console, and rails after peak hours.",
  "Inspect belt alignment and deck wear weekly.",
  "Confirm emergency stop and side rails are secure.",
  "Book professional service every 90 days for heavy use.",
];

const Hero = () => {
  return (
    <section className="relative px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            <FaRobot /> AI Powered Maintenance Assistant
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white md:text-7xl">
            AI Gym Equipment Maintenance Generator
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Create structured cleaning tips, preventive maintenance steps, safety checks, and
            service schedules for gym equipment using Google Gemini AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/generator"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:scale-105"
            >
              Generate AI Guide
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-blue-400 hover:bg-white/10"
            >
              About Project
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="glow-card w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sample Guide</p>
                <h3 className="text-2xl font-bold text-white">Commercial Treadmill</h3>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/20 text-violet-300">
                <FaFilePdf />
              </span>
            </div>

            <div className="space-y-4 text-gray-300">
              {sampleItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-300" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
