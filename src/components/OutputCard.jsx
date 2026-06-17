import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaDownload, FaShieldAlt, FaTools } from "react-icons/fa";
import { MdCleaningServices, MdEventRepeat } from "react-icons/md";
import { apiFetch, getApiUrl, readJsonResponse } from "../lib/api";

const PDF_ENDPOINTS = ["/generate-pdf", "/download-pdf"];

const sections = [
  { key: "cleaning", title: "Cleaning Tips", icon: <MdCleaningServices /> },
  { key: "maintenance", title: "Maintenance Tips", icon: <FaTools /> },
  { key: "safety", title: "Safety Tips", icon: <FaShieldAlt /> },
  { key: "service", title: "Service Schedule", icon: <MdEventRepeat /> },
];

function OutputCard({ guide, outputRef }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const handleDownloadPDF = async () => {
    if (!guide) {
      return;
    }

    try {
      setDownloading(true);
      setDownloadError("");

      const response = await requestPdf(guide);

      if (!response.ok) {
        const data = await readJsonResponse(response);
        throw new Error(
          data?.error || `Failed to generate PDF from ${getApiUrl(PDF_ENDPOINTS[0])}.`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${guide.equipmentName.replace(/\s+/g, "_").toLowerCase()}_guide.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError(error.message || "There was an error generating the PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section ref={outputRef} className="px-0 pb-20 pt-10">
      <AnimatePresence>
        {guide && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto mb-6 flex max-w-4xl items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-300"
          >
            <FaCheck />
            <span>Guide Generated Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!guide ? (
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white">No guide generated yet</h2>
          <p className="text-gray-400">Fill the form and click Generate AI Guide.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-300">{guide.customerName}</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                {guide.equipmentName}
              </h2>
              <p className="mt-2 text-gray-400">
                {guide.usageFrequency} usage | Generated {guide.generatedDate}
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {downloading ? (
                <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <FaDownload />
              )}
              <span>{downloading ? "Generating PDF..." : "Download PDF"}</span>
            </button>
          </div>

          <AnimatePresence>
            {downloadError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {downloadError}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, index) => (
              <GuideCard
                key={section.key}
                icon={section.icon}
                title={section.title}
                items={guide[section.key] || []}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

async function requestPdf(guide) {
  let lastResponse = null;

  for (const endpoint of PDF_ENDPOINTS) {
    const response = await apiFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guide),
    });

    if (response.ok || response.status !== 404) {
      return response;
    }

    lastResponse = response;
  }

  return lastResponse;
}

function GuideCard({ icon, title, items, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="glow-card rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-xl text-blue-300">
          {icon}
        </span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <ul className="space-y-3 text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <FaCheck className="mt-1 shrink-0 text-blue-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default OutputCard;
