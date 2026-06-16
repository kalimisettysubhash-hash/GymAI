import { motion } from "framer-motion";

const stats = [
  {
    type: "numerical",
    number: 500,
    suffix: "+",
    title: "Guides Generated",
  },
  {
    type: "numerical",
    number: 98,
    suffix: "%",
    title: "Accuracy",
  },
  {
    type: "numerical",
    number: 50,
    suffix: "+",
    title: "Equipment Types",
  },
  {
    type: "descriptive",
    title: "AI Powered",
    description: "Maintenance Assistant",
  },
  {
    type: "descriptive",
    title: "PDF Export",
    description: "Supported",
  },
];

const StatsSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
          >
            {item.type === "numerical" ? (
              <h2 className="text-4xl font-bold text-yellow-400">
                {item.number}{item.suffix}
              </h2>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-blue-400">
                  {item.title}
                </h2>
                <p className="text-gray-300 mt-3">{item.description}</p>
              </>
            )}

            <p className="text-gray-300 mt-3">
              {item.title}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default StatsSection;
