import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import Features from '../components/Features';
import { FaArrowTrendDown, FaHeartCircleCheck, FaIndianRupeeSign, FaScrewdriverWrench } from 'react-icons/fa6';

const benefits = [
  { icon: <FaArrowTrendDown />, title: 'Reduce equipment breakdowns' },
  { icon: <FaScrewdriverWrench />, title: 'Extend equipment lifespan' },
  { icon: <FaHeartCircleCheck />, title: 'Improve customer satisfaction' },
  { icon: <FaIndianRupeeSign />, title: 'Lower maintenance costs' },
];

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-semibold text-blue-300">Benefits</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">Designed for reliable gym operations</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-xl text-violet-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <StatsSection />
    </>
  );
};

export default Home;
