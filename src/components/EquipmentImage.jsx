import imgGymFloor from "../assets/200533.jpg";
import imgTechnician from "../assets/970e8722064e023af7fe798a104f3b13.jpg";
import imgStrength from "../assets/photo-1517836357463-d25dfeac3438.avif";
import imgMaintenance from "../assets/photo-1605296867304-46d5465a13f1.avif";

const equipmentImages = [
  { keywords: ["treadmill"], image: imgGymFloor, alt: "Treadmill maintenance area" },
  { keywords: ["bike", "cycle", "cycling"], image: imgMaintenance, alt: "Exercise bike maintenance setup" },
  { keywords: ["elliptical", "cross trainer"], image: imgTechnician, alt: "Elliptical trainer service inspection" },
  { keywords: ["bench", "bench press"], image: imgStrength, alt: "Bench press strength equipment" },
  { keywords: ["dumbbell", "dumbbells", "free weight"], image: imgStrength, alt: "Dumbbell strength training equipment" },
];

function EquipmentImage({ equipmentName = "" }) {
  const normalizedName = equipmentName.toLowerCase();
  const match = equipmentImages.find((item) =>
    item.keywords.some((keyword) => normalizedName.includes(keyword))
  );
  const image = match?.image || imgTechnician;
  const alt = match?.alt || "General gym equipment maintenance tools";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <img
        src={image}
        alt={alt}
        className="h-64 w-full object-cover md:h-full"
        loading="lazy"
      />
    </div>
  );
}

export default EquipmentImage;
