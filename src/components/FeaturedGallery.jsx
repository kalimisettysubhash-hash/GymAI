import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { galleryData } from "../data/galleryData";
import fallbackImg from "../assets/200533.jpg";

function FeaturedGallery() {
  const [index, setIndex] = useState(-1);

  const slides = galleryData.map((item) => ({
    src: item.image,
  }));

  const handleImgError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImg;
  };

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-white text-center">
          Featured Gallery
        </h2>
        <p className="text-gray-400 text-center mt-4">
          Explore our curated gym maintenance visuals.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setIndex(i)}
            className="cursor-pointer overflow-hidden rounded-lg group"
          >
            <img
              src={item.image}
              alt={item.alt || "Gallery image"}
              onError={handleImgError}
              className="
                w-full
                h-[400px]
                object-cover
                group-hover:scale-110
                transition
                duration-700
              "
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
      />
    </section>
  );
}

export default FeaturedGallery;
