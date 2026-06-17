const objectives = [
  "Generate structured maintenance guidance for gym equipment.",
  "Reduce manual effort for cleaning, safety, and service planning.",
  "Provide PDF-ready reports suitable for facility teams and clients.",
  "Demonstrate a full-stack AI workflow with a polished presentation UI.",
];

const stack = [
  "React + Vite",
  "Tailwind CSS",
  "Framer Motion",
  "React Icons",
  "React Router DOM",
  "Python Flask",
  "Google Gemini API with google-genai",
  "ReportLab PDF generation",
];

const About = () => {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-semibold text-blue-300">About Project</p>
        <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          GymAI - AI Gym Equipment Maintenance Generator
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="glow-card rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-4 text-2xl font-bold text-white">Project Overview</h2>
            <p className="leading-8 text-gray-400">
              GymAI is a full-stack AI web application for generating gym equipment maintenance
              guides. Users enter customer details, equipment name, usage frequency, and notes.
              The Flask backend sends that context to Gemini and returns validated JSON with
              cleaning tips, maintenance tips, safety tips, and service scheduling guidance.
            </p>
          </section>

          <section className="glow-card rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="mb-4 text-2xl font-bold text-white">Objectives</h2>
            <ul className="space-y-3 text-gray-300">
              {objectives.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="mb-5 text-2xl font-bold text-white">Technology Stack Used</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-gray-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
