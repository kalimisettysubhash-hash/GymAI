import { lazy, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageWrapper from "./components/PageWrapper";
import ScrollToHash from "./components/ScrollToHash";

const About = lazy(() => import("./pages/About"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Assistant = lazy(() => import("./pages/Assistant"));
const Generator = lazy(() => import("./pages/Generator"));
const History = lazy(() => import("./pages/History"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <ScrollToHash />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.22),transparent_32%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <motion.div
        className="fixed left-0 right-0 top-0 z-[999] h-1 bg-blue-500"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />

      <Navbar />

      <PageWrapper>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/history" element={<History />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageWrapper>

      <Footer />
    </div>
  );
}

function RouteLoader() {
  return (
    <div className="grid min-h-[50vh] place-items-center px-6">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-blue-100">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-transparent" />
        <span className="font-medium">Loading...</span>
      </div>
    </div>
  );
}

export default App;
