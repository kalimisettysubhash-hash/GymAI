import { useState } from "react";
import { motion } from "framer-motion";


const API_BASE_URL = "https://gymai-7r7j.onrender.com";
const GeneratorForm = ({ onGenerate }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    equipmentName: "",
    usageFrequency: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const generateGuide = async () => {
    const { customerName, equipmentName, usageFrequency, notes } = formData;

    const response = await fetch(`${API_BASE_URL}/generate-guide`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        customerName,
        equipmentName,
        usageFrequency,
        notes,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Gemini Response:", data);

    if (!data.success) {
      throw new Error(data.error || "The backend returned an invalid response.");
    }

    return data;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.equipmentName.trim()) {
      newErrors.equipmentName = "Please enter equipment name.";
    }
    if (!formData.usageFrequency) {
      newErrors.usageFrequency = "Please select usage frequency.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const data = await generateGuide();
      const { customerName, equipmentName, usageFrequency, notes } = formData;
      const generatedGuide = {
        customerName,
        equipment: equipmentName,
        usageFrequency,
        notes,
        generatedAt: new Date().toLocaleString(), // Add generatedAt timestamp
        cleaning: data.result.cleaning,
        maintenance: data.result.maintenance,
        safety: data.result.safety,
        service: data.result.service,
      };

      console.log("Cleaning:", data.result.cleaning);
      console.log("Maintenance:", data.result.maintenance);
      console.log("Safety:", data.result.safety);
      console.log("Service:", data.result.service);

      if (onGenerate) {
        onGenerate(generatedGuide, formData);
      }
    } catch (error) {
      console.error("Error:", error);
      setApiError("Unable to generate guide.\nPlease try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="generator"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glow-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm">
              AI Powered Generator
            </span>
          </div>

          <h2 className="text-4xl font-bold text-white text-center mb-3">
            Generate Maintenance Guide
          </h2>

          <p className="text-gray-400 text-center mb-10">
            Enter equipment details and let AI generate a professional maintenance guide.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="equipmentName"
              placeholder="Equipment Name"
              value={formData.equipmentName}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.equipmentName && (
              <p className="text-red-400 text-sm mt-2">{errors.equipmentName}</p>
            )}

            <select
              name="usageFrequency"
              value={formData.usageFrequency}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Usage Frequency</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Heavy Use</option>
              <option>Light Use</option>
            </select>
            {errors.usageFrequency && (
              <p className="text-red-400 text-sm mt-2">{errors.usageFrequency}</p>
            )}

            <textarea
              rows="4"
              name="notes"
              placeholder="Additional Notes..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />

            {apiError && (
              <p className="text-red-400 text-sm mt-2 whitespace-pre-line">{apiError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-blue-600 rounded-xl text-white font-semibold ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
             {loading ? (
  <div className="flex items-center justify-center gap-3">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>AI is analyzing equipment...</span>
  </div>
) : (
  "Generate AI Guide"
)}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GeneratorForm;
