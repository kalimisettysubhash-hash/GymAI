const LOCAL_API_BASE_URL = "http://127.0.0.1:5000";
const PROD_API_BASE_URL = "https://gymai-7r7j.onrender.com";

export function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredUrl) {
    const normalizedUrl = configuredUrl.replace(/\/+$/, "");

    if (!import.meta.env.DEV && isLocalApiUrl(normalizedUrl)) {
      throw new Error(
        "Production API URL is pointing to localhost. Set VITE_API_BASE_URL to your Render backend URL."
      );
    }

    return normalizedUrl;
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_BASE_URL;
  }

  return PROD_API_BASE_URL;
}

export function getApiUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}

export async function apiFetch(path, options = {}) {
  const apiUrl = getApiUrl(path);

  if (!getApiBaseUrl()) {
    throw new Error(
      "Backend API URL is not configured. Set VITE_API_BASE_URL to your deployed Flask backend URL."
    );
  }

  try {
    return await fetch(apiUrl, options);
  } catch (error) {
    throw new Error(
      `Unable to reach backend at ${apiUrl}. Check VITE_API_BASE_URL and make sure the Render service is running.`,
      { cause: error }
    );
  }
}

export async function readJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function askAssistant(question) {
  try {
    const response = await apiFetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await readJsonResponse(response);

    if (!response.ok || !data?.success) {
      throw new Error(data?.error || "The AI assistant could not answer right now.");
    }

    return data.answer;
  } catch (error) {
    throw new Error(
      error.message || "Unable to reach the AI assistant. Please try again.",
      { cause: error }
    );
  }
}

function isLocalApiUrl(url) {
  return /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(url);
}