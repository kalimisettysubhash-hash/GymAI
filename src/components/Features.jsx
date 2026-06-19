import { motion } from "framer-motion";
import { FaCalendarCheck, FaChartPie, FaFilePdf, FaRobot } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Maintenance Tips",
    desc: "Generate practical cleaning, maintenance, safety, and service tasks from equipment details.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Maintenance Scheduling",
    desc: "Receive service timing guidance based on light, moderate, or heavy usage patterns.",
  },
  {
    icon: <FaChartPie />,
    title: "Analytics Dashboard",
    desc: "Monitor guide volume, priority equipment, ratings, and request trends.",
  },
  {
    icon: <FaFilePdf />,
    title: "PDF Reports",
    desc: "Download a professional maintenance guide that can be shared with staff or clients.",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 font-semibold text-blue-300">Features</p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">Built for Gym Operations</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ icon, title, desc, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="glow-card rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-2xl text-blue-300">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="leading-7 text-gray-400">{desc}</p>
    </motion.article>
  );
}

export default Features;
