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
    const usage = formData.usageFrequency || 'regular';
    const equipment = apiGuide.equipment || formData.equipmentName || 'Equipment';

    const nextGuide = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      customerName: formData.customerName || 'Valued Customer',
      equipment,
      usageFrequency: usage,
      notes: formData.notes || 'No additional notes provided.',
      cleaning: apiGuide.cleaning || [
        `Wipe the ${equipment} after every use to remove dust and sweat.`,
        `Inspect and clean moving parts at least once a ${usage === 'Daily' ? 'week' : 'month'}.`,
      ],
      maintenance: apiGuide.maintenance || [
        'Check fasteners and adjust tension as needed every 30 days.',
        'Lubricate components and inspect belts or rollers for wear.',
      ],
      safety: apiGuide.safety || [
        "Always follow the manufacturer's safety guidelines.",
        'Keep the area clear of obstructions and never overload the machine.',
      ],
      service: apiGuide.service || [
        'Schedule professional servicing every 6 months or sooner for heavy use.',
      ],
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
        <p className="text-blue-400 font-semibold mb-3">Page 2</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Guide Generator</h1>
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
