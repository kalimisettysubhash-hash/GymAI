import { Link } from "react-router-dom";

const History = () => {
  let guideHistory = [];
  try {
    guideHistory = JSON.parse(localStorage.getItem("guideHistory") || "[]");
  } catch (error) {
    console.error("Error parsing guide history:", error);
    guideHistory = [];
  }

  return (
    <main className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-blue-400 font-semibold mb-3">Page 3</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guide History</h1>
            <p className="text-gray-400 max-w-2xl">
              Review recently generated maintenance guides and keep track of equipment care plans.
            </p>
          </div>

          <Link
            to="/generator"
            className="inline-flex justify-center bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold transition"
          >
            Create New Guide
          </Link>
        </div>

        {guideHistory.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {guideHistory.map((guide) => (
              <article
                key={guide.id || `${guide.equipment}-${guide.createdAt}`}
                className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{guide.equipment}</h2>
                    <p className="text-gray-400 mt-1">
                      {guide.customerName} | {guide.usageFrequency || "Regular"} use
                    </p>
                  </div>

                  <span className="text-sm text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                    {guide.createdAt
                      ? `Generated On: ${new Date(guide.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
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
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">No guides saved yet</h2>
            <p className="text-gray-400 mb-6">
              Generate your first maintenance guide and it will appear here automatically.
            </p>
            <Link
              to="/generator"
              className="inline-flex bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold transition"
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
    <div className="bg-black/30 border border-white/10 rounded-xl p-4">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

export default History;
