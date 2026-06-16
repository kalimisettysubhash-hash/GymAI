import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

function OutputCard({ guide, outputRef }) {

  if (!guide) {
    return (
      <section
        ref={outputRef}
        className="px-6 pb-24 bg-black"
      >
        <div className="max-w-6xl mx-auto text-center py-24">
          <h2 className="text-4xl font-bold text-white mb-4">
            No maintenance guide generated yet
          </h2>
          <p className="text-gray-400">
            Fill the form and click Generate AI Guide
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={outputRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 pb-24 bg-black"
    >
      <div className="max-w-4xl mx-auto mb-6 bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded-xl flex items-center gap-2 justify-center">
        <FaCheck /> <span>Guide Generated Successfully</span>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          AI Generated Guide
        </h2>

        <div className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-white text-xl">Equipment</h3>

          <p className="text-blue-400 mt-2 text-lg font-semibold">{guide.equipment}</p>
          <p className="text-gray-400 text-sm mt-1">
            Generated: {guide.generatedAt || 'N/A'}
          </p>
          <p className="text-gray-400 text-sm">Usage: {guide.usageFrequency || 'N/A'}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <GuideCard title="Cleaning Tips" items={guide.cleaning || []} />

          <GuideCard title="Maintenance Tips" items={guide.maintenance || []} />

          <GuideCard title="Safety Tips" items={guide.safety || []} />

          <GuideCard title="Service Schedule" items={guide.service || []} />
        </div>
      </div>
    </motion.section>
  );
}

function GuideCard({ title, items }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
    >
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>

      {items.length > 0 ? (
        <ul className="space-y-3 text-gray-300">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <FaCheck className="mt-1 shrink-0 text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </motion.div>
  );
}

export default OutputCard;
