import { useEffect, useRef, useState } from 'react';
import GeneratorForm from '../components/GeneratorForm';
import OutputCard from '../components/OutputCard';

const Generator = () => {
  const [guide, setGuide] = useState(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (guide && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [guide]);

  const handleGenerateGuide = (apiGuide, formData) => {
    const nextGuide = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      generatedDate: new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      customerName: formData.customerName,
      equipmentName: formData.equipmentName,
      usageFrequency: formData.usageFrequency,
      notes: formData.notes,
      cleaning: apiGuide.cleaning,
      maintenance: apiGuide.maintenance,
      safety: apiGuide.safety,
      service: apiGuide.service,
    };

    setGuide(nextGuide);

    let savedGuides = [];
    try {
      savedGuides = JSON.parse(localStorage.getItem('guideHistory') || '[]');
    } catch (error) {
      console.error("Error parsing guide history:", error);
    }
    localStorage.setItem('guideHistory', JSON.stringify([nextGuide, ...savedGuides].slice(0, 10)));
  };

  return (
    <div className="px-6 py-16">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <p className="text-blue-300 font-semibold mb-3">AI Guide Generator</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Generate a Maintenance Guide</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create a professional cleaning, maintenance, safety, and service plan for any gym equipment.
        </p>
      </div>

      <GeneratorForm onGenerate={handleGenerateGuide} />
      <OutputCard guide={guide} outputRef={outputRef} />
    </div>
  );
};

export default Generator;
