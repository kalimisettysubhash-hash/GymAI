import { motion } from "framer-motion";
import { useState } from "react";
import { FaMagic } from "react-icons/fa";
import { apiFetch, readJsonResponse } from "../lib/api";

const initialFormData = {
  customerName: "",
  equipmentName: "",
  usageFrequency: "",
  notes: "",
};

const usageFrequencyOptions = [
  { label: "Daily", apiValue: "Heavy" },
  { label: "3-5 Times Per Week", apiValue: "Moderate" },
  { label: "Weekly", apiValue: "Light" },
];

const usageFrequencyApiMap = usageFrequencyOptions.reduce((map, option) => {
  map[option.label] = option.apiValue;
  return map;
}, {});

const GeneratorForm = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.customerName.trim()) {
      nextErrors.customerName = "Please enter customer name.";
    }

    if (!formData.equipmentName.trim()) {
      nextErrors.equipmentName = "Please enter equipment name.";
    }

    if (!formData.usageFrequency) {
      nextErrors.usageFrequency = "Please select usage frequency.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitGuide = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const apiPayload = {
        ...formData,
        usageFrequency: usageFrequencyApiMap[formData.usageFrequency] || formData.usageFrequency,
      };

      const response = await apiFetch("/generate-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      const data = await readJsonResponse(response);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to generate guide. Please try again.");
      }

      onGenerate?.(data.result, formData);
    } catch (error) {
      setApiError(error.message || "Unable to generate guide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitGuide();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="glow-card rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldError message={errors.customerName} />
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400"
            />

            <FieldError message={errors.equipmentName} />
            <input
              type="text"
              name="equipmentName"
              placeholder="Equipment Name"
              value={formData.equipmentName}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400"
            />

            <FieldError message={errors.usageFrequency} />
            <select
              name="usageFrequency"
              value={formData.usageFrequency}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none transition focus:border-blue-400"
            >
              <option value="">Usage Frequency</option>
              {usageFrequencyOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>

            <textarea
              rows="5"
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400"
            />

            {apiError && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
              >
                <p className="text-sm text-red-300">{apiError}</p>
                <button
                  type="button"
                  onClick={submitGuide}
                  disabled={loading}
                  className="self-start text-sm font-medium text-red-400 underline transition hover:text-red-300"
                >
                  Retry
                </button>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>AI is generating personalized maintenance recommendations...</span>
                </>
              ) : (
                <>
                  <FaMagic />
                  <span>Generate AI Guide</span>
                </>
              )}
            </button>

            {loading && <LoadingPreview />}
          </form>
        </div>
      </div>
    </motion.section>
  );
};

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-300">{message}</p>;
}

function LoadingPreview() {
  return (
    <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
      <div className="mb-5 flex items-center gap-3 text-blue-100">
        <span className="h-6 w-6 rounded-full border-2 border-blue-200 border-t-transparent animate-spin" />
        <span className="font-medium">
          AI is generating personalized maintenance recommendations...
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="mb-4 h-4 w-1/2 animate-pulse rounded-full bg-white/15" />
            <div className="space-y-3">
              <div className="h-3 animate-pulse rounded-full bg-white/10" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratorForm;
