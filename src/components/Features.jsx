import {
  FaRobot,
  FaHistory,
  FaShieldAlt,
} from "react-icons/fa";

const Features = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Use GymAI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            icon={<FaRobot />}
            title="AI Generated Tips"
            desc="Get intelligent maintenance suggestions instantly."
          />

          <FeatureCard
            icon={<FaHistory />}
            title="History Tracking"
            desc="Access previous maintenance guides anytime."
          />

          <FeatureCard
            icon={<FaShieldAlt />}
            title="Safety First"
            desc="Receive equipment safety recommendations."
          />

        </div>

      </div>
    </section>
  );
};

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition">

      <div className="text-blue-400 text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white">
        {title}
      </h3>

      <p className="text-gray-400">
        {desc}
      </p>

    </div>
  );
}

export default Features;
