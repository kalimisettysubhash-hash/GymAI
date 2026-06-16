import { motion, useScroll } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";
import About from "./pages/About";
import Generator from "./pages/Generator";
import History from "./pages/History";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[999]"
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
