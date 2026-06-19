const RATING_STORAGE_KEY = "guideRatings";

export const defaultSchedule = [
  { task: "Clean Surface", frequency: "Daily" },
  { task: "Inspect Bolts", frequency: "Weekly" },
  { task: "Lubricate Moving Parts", frequency: "Monthly" },
];

export function normalizeUsageFrequency(value = "") {
  return value.trim().toLowerCase();
}

export function getMaintenancePriority(usageFrequency = "") {
  const usage = normalizeUsageFrequency(usageFrequency);

  if (["daily", "heavy"].includes(usage)) {
    return {
      label: "High Priority",
      tone: "red",
      className: "border-red-400/30 bg-red-500/15 text-red-200",
    };
  }

  if (["3-5 times per week", "3-5 times/week", "moderate"].includes(usage)) {
    return {
      label: "Medium Priority",
      tone: "yellow",
      className: "border-yellow-300/30 bg-yellow-400/15 text-yellow-100",
    };
  }

  return {
    label: "Low Priority",
    tone: "green",
    className: "border-green-400/30 bg-green-500/15 text-green-200",
  };
}

export function buildMaintenanceSchedule(guide = {}) {
  if (Array.isArray(guide.schedule) && guide.schedule.length) {
    return guide.schedule
      .map((item) => ({
        task: item.task || item.maintenanceTask || item.name || "",
        frequency: item.frequency || item.interval || "",
      }))
      .filter((item) => item.task && item.frequency);
  }

  const serviceItems = Array.isArray(guide.service) ? guide.service : [];
  const maintenanceItems = Array.isArray(guide.maintenance) ? guide.maintenance : [];
  const parsedItems = [...serviceItems, ...maintenanceItems]
    .map(parseScheduleText)
    .filter(Boolean);

  return parsedItems.length ? parsedItems.slice(0, 5) : defaultSchedule;
}

export function estimateMaintenanceCost(usageFrequency = "") {
  const usage = normalizeUsageFrequency(usageFrequency);
  const monthly = usage === "daily" || usage === "heavy" ? 600 : usage.includes("3-5") || usage === "moderate" ? 350 : 200;

  return {
    monthly,
    yearly: monthly * 12,
  };
}

export function getNextMaintenanceDate(usageFrequency = "", fromDate = new Date()) {
  const usage = normalizeUsageFrequency(usageFrequency);
  const daysToAdd = usage === "daily" || usage === "heavy" ? 14 : usage.includes("3-5") || usage === "moderate" ? 30 : 45;
  const nextDate = new Date(fromDate);
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildGuideText(guide = {}) {
  const schedule = buildMaintenanceSchedule(guide);
  const sections = [
    ["Cleaning Tips", guide.cleaning],
    ["Maintenance Tips", guide.maintenance],
    ["Safety Tips", guide.safety],
    ["Service Schedule", guide.service],
  ];

  const sectionText = sections
    .filter(([, items]) => Array.isArray(items) && items.length)
    .map(([title, items]) => `${title}\n${items.map((item) => `- ${item}`).join("\n")}`)
    .join("\n\n");

  const scheduleText = schedule.map((item) => `- ${item.task}: ${item.frequency}`).join("\n");

  return `${guide.equipmentName}\nUsage: ${guide.usageFrequency}\nGenerated: ${guide.generatedDate}\n\n${sectionText}\n\nMaintenance Schedule\n${scheduleText}`;
}

export function getStoredRatings() {
  try {
    return JSON.parse(localStorage.getItem(RATING_STORAGE_KEY) || "{}");
  } catch (error) {
    console.error("Error parsing guide ratings:", error);
    return {};
  }
}

export function saveGuideRating(guideId, rating) {
  const ratings = getStoredRatings();
  ratings[guideId] = {
    rating,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(RATING_STORAGE_KEY, JSON.stringify(ratings));
  return ratings[guideId];
}

export function buildAnalytics(history = [], ratings = getStoredRatings()) {
  const totalGuides = history.length;
  const ratingValues = Object.values(ratings).map((item) => Number(item.rating)).filter(Boolean);
  const averageRating = ratingValues.length
    ? ratingValues.reduce((sum, value) => sum + value, 0) / ratingValues.length
    : 0;
  const equipmentCounts = countBy(history.map((guide) => guide.equipmentName || guide.equipment || "Unknown"));
  const mostRequestedEquipment = Object.entries(equipmentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No data";
  const highPriorityCount = history.filter((guide) => getMaintenancePriority(guide.usageFrequency).tone === "red").length;
  const dailyTrends = countBy(
    history.map((guide) =>
      guide.createdAt
        ? new Date(guide.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Saved"
    )
  );

  return {
    totalGuides,
    averageRating,
    mostRequestedEquipment,
    highPriorityCount,
    equipmentChart: Object.entries(equipmentCounts).map(([name, total]) => ({ name, total })),
    trendChart: Object.entries(dailyTrends).map(([date, total]) => ({ date, total })),
  };
}

function parseScheduleText(text = "") {
  const frequencyMatch = text.match(/\b(daily|weekly|monthly|quarterly|annually|yearly|every\s+\d+\s+(days?|weeks?|months?)|after each use)\b/i);

  if (!frequencyMatch) {
    return null;
  }

  const task = text
    .replace(frequencyMatch[0], "")
    .replace(/^[\s:,-]+|[\s:,-]+$/g, "")
    .replace(/\s{2,}/g, " ");

  return {
    task: task || "Maintenance Check",
    frequency: toTitleCase(frequencyMatch[0]),
  };
}

function countBy(values) {
  return values.reduce((counts, value) => {
    const key = String(value || "Unknown").trim() || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function toTitleCase(value = "") {
  return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
