const About = () => {
  const highlights = [
    "React multi-page frontend with reusable components",
    "AI-assisted maintenance guide generation",
    "Guide history saved in the browser for quick review",
    "PDF export for generated maintenance plans",
  ];

  return (
    <main className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-blue-400 font-semibold mb-3">Page 4</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Project</h1>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <section className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              GymAI Maintenance Guide Generator
            </h2>
            <p className="text-gray-400 leading-7 mb-5">
              GymAI is an internship project built to help gym owners, trainers, and facility teams
              create practical equipment maintenance guides in seconds. Instead of manually writing
              cleaning routines, safety checks, and service schedules, users enter equipment details
              and receive a structured AI-generated guide.
            </p>
            <p className="text-gray-400 leading-7">
              The project is organized like a small SaaS product, with a landing page, generator,
              history view, and project overview. This structure makes the app easier to present,
              easier to navigate, and closer to a real-world production workflow.
            </p>
          </section>

          <aside className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-5">Project Modules</h2>
            <ul className="space-y-4 text-gray-300">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="grid md:grid-cols-4 gap-4 mt-8">
          <ProjectStep number="01" title="Home" desc="Introduces the product and value." />
          <ProjectStep number="02" title="Generator" desc="Creates AI maintenance guides." />
          <ProjectStep number="03" title="History" desc="Stores recently generated guides." />
          <ProjectStep number="04" title="About" desc="Explains the project scope." />
        </section>
      </div>
    </main>
  );
};

function ProjectStep({ number, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-blue-400 font-bold">{number}</p>
      <h3 className="text-white text-xl font-semibold mt-3">{title}</h3>
      <p className="text-gray-400 mt-2">{desc}</p>
    </div>
  );
}

export default About;
