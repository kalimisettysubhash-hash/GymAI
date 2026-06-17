import { motion } from "framer-motion";

const stats = [
  { value: "500+", title: "Guides Generated" },
  { value: "AI", title: "Powered" },
  { value: "PDF", title: "Supported" },
];

const StatsSection = () => {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glow-card rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
          >
            <h2 className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-5xl font-bold text-transparent">
              {item.value}
            </h2>
            <p className="mt-3 font-medium text-gray-300">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
