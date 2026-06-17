import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHAT_API_URL = "https://gymai-7r7j.onrender.com/chat";

const starterPrompts = [
  "How often should I clean a treadmill?",
  "Why is my elliptical making noise?",
  "When should I service a cable machine?",
];

const createMessage = (role, text) => ({
  id: crypto.randomUUID(),
  role,
  text,
});

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askAI = async (message = userMessage) => {
    const question = message.trim();

    if (!question || loading) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", question),
    ]);
    setUserMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "The AI assistant could not answer right now."
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("ai", data.answer),
      ]);
    } catch (apiError) {
      const fallbackMessage =
        apiError.message ||
        "Something went wrong while contacting the AI assistant. Please try again.";

      setError(fallbackMessage);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("ai", fallbackMessage),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askAI();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askAI();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setUserMessage("");
    setError("");
  };

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
        <header className="flex flex-col gap-5 border-b border-white/10 bg-black/35 px-5 py-6 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300"
            >
              AI Assistant
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Gym Maintenance Chat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base"
            >
              Ask about equipment cleaning, service intervals, inspections,
              troubleshooting, and safe maintenance routines.
            </motion.p>
          </div>

          <button
            type="button"
            onClick={clearChat}
            disabled={messages.length === 0 && !userMessage}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-red-400/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear Chat
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-7">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mx-auto flex max-w-3xl flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25">
                  <span className="text-2xl">AI</span>
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  How can I help maintain your equipment?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                  Start with a maintenance question and get a clear, practical
                  answer for your gym floor.
                </p>

                <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => askAI(prompt)}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4 text-left text-sm leading-6 text-gray-200 transition hover:border-blue-400/60 hover:bg-blue-500/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex justify-start"
            >
              <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-5 py-4 text-gray-200 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">AI is thinking</span>
                  <TypingDots />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 sm:mx-7"
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="border-t border-white/10 bg-black/35 p-4 sm:p-6"
        >
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-black/50 p-2 shadow-inner shadow-black/30 transition focus-within:border-blue-400/70">
            <textarea
              value={userMessage}
              onChange={(event) => setUserMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask about treadmill cleaning, service schedules, noises, inspections..."
              className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-500 sm:text-base"
            />
            <button
              type="submit"
              disabled={!userMessage.trim() || loading}
              className="min-h-12 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Ask AI
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            Press Enter to send. Press Shift + Enter for a new line.
          </p>
        </form>
      </section>
    </main>
  );
}

function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-5 py-4 text-sm leading-6 shadow-lg sm:max-w-[75%] sm:text-base ${
          isUser
            ? "rounded-br-md bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-blue-500/15"
            : "rounded-bl-md border border-white/10 bg-white/10 text-gray-100 shadow-black/20 backdrop-blur-xl"
        }`}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
          {isUser ? "You" : "AI"}
        </div>
        {message.text}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-blue-300"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: dot * 0.14,
          }}
        />
      ))}
    </span>
  );
}

export default Assistant;
