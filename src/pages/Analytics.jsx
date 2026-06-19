import { useMemo } from "react";
import { FaChartLine, FaClipboardList, FaExclamationTriangle, FaStar } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildAnalytics, getStoredRatings } from "../utils/maintenance";

const Analytics = () => {
  const history = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("guideHistory") || "[]");
    } catch (error) {
      console.error("Error parsing guide history:", error);
      return [];
    }
  }, []);

  const analytics = buildAnalytics(history, getStoredRatings());

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 font-semibold text-blue-300">Admin Dashboard</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Analytics Dashboard</h1>
          <p className="max-w-2xl text-gray-400">
            Track generation volume, user satisfaction, requested equipment, priority risk, and daily trends.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<FaClipboardList />} label="Total Guides Generated" value={analytics.totalGuides} />
          <MetricCard icon={<FaStar />} label="Average User Rating" value={analytics.averageRating ? analytics.averageRating.toFixed(1) : "0.0"} />
          <MetricCard icon={<FaChartLine />} label="Most Requested Equipment" value={analytics.mostRequestedEquipment} />
          <MetricCard icon={<FaExclamationTriangle />} label="High Priority Equipment" value={analytics.highPriorityCount} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ChartPanel title="Most Requested Equipment">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.equipmentChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "#0b0b0f", border: "1px solid rgba(255,255,255,0.12)" }} />
                <Bar dataKey="total" fill="#60a5fa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>

          <ChartPanel title="Daily Usage Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.trendChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: "#0b0b0f", border: "1px solid rgba(255,255,255,0.12)" }} />
                <Line type="monotone" dataKey="total" stroke="#a78bfa" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartPanel>
        </div>
      </div>
    </main>
  );
};

function MetricCard({ icon, label, value }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-xl text-blue-300">
        {icon}
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-3 break-words text-3xl font-bold text-white">{value}</p>
    </article>
  );
}

function ChartPanel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

export default Analytics;
