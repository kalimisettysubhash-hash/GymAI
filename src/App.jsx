import { motion, useScroll } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageWrapper from "./components/PageWrapper";
import ScrollToHash from "./components/ScrollToHash";
import About from "./pages/About";
import Assistant from "./pages/Assistant";
import Generator from "./pages/Generator";
import History from "./pages/History";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageWrapper>

      <Footer />
    </div>
  );
}

export default App;
