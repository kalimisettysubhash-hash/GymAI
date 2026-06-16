import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="px-6 py-24 text-center">
      <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">
        <p className="text-blue-400 font-semibold mb-3">404</p>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          This page does not exist in the GymAI app.
        </p>
        <Link
          to="/"
          className="inline-flex bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
