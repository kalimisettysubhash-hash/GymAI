import { motion } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaDumbbell, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const History = () => {
  const [guideHistory, setGuideHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("guideHistory") || "[]");
    } catch (error) {
      console.error("Error parsing guide history:", error);
      return [];
    }
  });

  const handleDelete = (id) => {
    const updatedHistory = guideHistory.filter(
      (guide) => (guide.id || `${guide.equipmentName || guide.equipment}-${guide.createdAt}`) !== id
    );
    setGuideHistory(updatedHistory);
    localStorage.setItem("guideHistory", JSON.stringify(updatedHistory));
  };

  return (
    <main className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-blue-300 font-semibold mb-3">Guide History</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guide History</h1>
            <p className="text-gray-400 max-w-2xl">
              Review recently generated maintenance guides and keep track of equipment care plans.
            </p>
          </div>

          <Link
            to="/generator"
            className="inline-flex justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
            Create New Guide
          </Link>
        </div>

        {guideHistory.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {guideHistory.map((guide) => {
              const uniqueId = guide.id || `${guide.equipmentName || guide.equipment}-${guide.createdAt}`;
              return (
                <motion.article
                  key={uniqueId}
                  whileHover={{ y: -8 }}
                  className="glow-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl relative"
                >
                  <button
                    onClick={() => handleDelete(uniqueId)}
                    className="absolute top-6 right-6 text-red-400/70 hover:text-red-400 transition"
                    aria-label="Delete guide"
                  >
                    <FaTrash />
                  </button>
                  <div className="flex items-start justify-between gap-4 mb-5 pr-8">
                    <div>
                      <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                        <FaDumbbell className="text-blue-300" /> {guide.equipmentName || guide.equipment}
                      </h2>
                      <p className="text-gray-400 mt-1">
                        {guide.customerName} | {guide.usageFrequency} use
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                      <FaCalendarAlt />
                      {guide.createdAt
                        ? new Date(guide.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                        : "Saved"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Cleaning" value={guide.cleaning?.length || 0} />
                    <Metric label="Maintenance" value={guide.maintenance?.length || 0} />
                    <Metric label="Safety" value={guide.safety?.length || 0} />
                    <Metric label="Service" value={guide.service?.length || 0} />
                  </div>

                  <p className="text-gray-400 mt-5 line-clamp-2">{guide.notes}</p>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">No guides saved yet</h2>
            <p className="text-gray-400 mb-6">
              Generate your first maintenance guide and it will appear here automatically.
            </p>
            <Link
              to="/generator"
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Open Generator
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

export default History;
