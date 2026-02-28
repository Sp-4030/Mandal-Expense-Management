import React, { useState } from "react";

const images = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  // Zoom states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // Sort images by filename (year in parentheses)
  const sortedImages = Object.entries(images).sort(([pathA], [pathB]) => {
    const getFileName = (path) => path.split("/").pop().replace(/\.(png|jpe?g|svg)$/i, "");
    const nameA = getFileName(pathA);
    const nameB = getFileName(pathB);
    
    // Extract year from filename like "name (2025)"
    const yearRegex = /\((\d{4})\)/;
    const yearA = parseInt(nameA.match(yearRegex)?.[1] || "0");
    const yearB = parseInt(nameB.match(yearRegex)?.[1] || "0");
    
    // Sort by year descending (newest first), then by name
    if (yearA !== yearB) {
      return yearB - yearA;
    }
    return nameA.localeCompare(nameB);
  });

  // Helper to split title into name and year
  const splitTitle = (title) => {
    const match = title.match(/^(.*?)(?:\s*\((\d{4})\))?$/);
    return {
      name: match ? match[1].trim() : title,
      year: match && match[2] ? match[2] : null,
    };
  };

  // Determine the maximum year present (used to highlight latest year)
  const maxYear = sortedImages.reduce((max, [path]) => {
    const file = path.split("/").pop().replace(/\.(png|jpe?g|svg)$/i, "");
    const y = parseInt(splitTitle(file).year || "0");
    return Math.max(max, isNaN(y) ? 0 : y);
  }, 0);

  const closemandal = () => {
    setSelectedImage(null);
    setSelectedTitle("");
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-12">
      
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-wide">
        श्रीची मूर्ती देणगीदार
      </h1>

      <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full mb-12"></div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedImages.map(([path, img], index) => {
          const title = path.split("/").pop().replace(/\.(png|jpe?g|svg)$/i, "");
          const { name, year } = splitTitle(title);

          return (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(img.default);
                setSelectedTitle(title);
              }}
              className="group cursor-pointer rounded-2xl
                         bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500
                         p-[2px] transition-all duration-500
                         hover:scale-[1.03]"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl">
                <img
                  src={img.default}
                  alt={title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="p-4 text-center font-semibold text-black text-2xl group-hover:text-orange-600">
                  <span className="block">{name}</span>
                  {year && (
                    <span
                      className={`block text-lg ${parseInt(year) === maxYear ? 'font-bold text-black' : 'font-bold text-black'}`}>
                      ({year})
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* mandal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm "
          onClick={closemandal}
        >
          <div
            className="relative max-w-4xl w-200 px-1 top-3 "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute -top-10 right-2 text-white text-4xl font-bold hover:text-red-400 cursor-pointer"
              onClick={closemandal}
            >
              &times;
            </button>

            {/* Gradient Border */}
            <div className="p-[3px] rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 shadow-[0_0_40px_rgba(255,140,0,0.45)] overflow-hidden">
              
              {/* Zoom Image */}
              <img
                src={selectedImage}
                alt={selectedTitle}
                onWheel={(e) => {
                  e.preventDefault();
                  setScale((prev) =>
                    Math.min(Math.max(prev + (e.deltaY < 0 ? 0.2 : -0.2), 1), 4)
                  );
                }}
                onMouseDown={(e) => {
                  setDragging(true);
                  setStart({
                    x: e.clientX - position.x,
                    y: e.clientY - position.y,
                  });
                }}
                onMouseMove={(e) => {
                  if (!dragging) return;
                  setPosition({
                    x: e.clientX - start.x,
                    y: e.clientY - start.y,
                  });
                }}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                onClick={() => setScale(scale === 1 ? 2 : 1)}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: dragging ? "none" : "transform 0.3s ease",
                  cursor: scale > 1 ? "grab" : "zoom-in",
                }}
                className="w-full max-h-[80vh] object-contain rounded-2xl bg-black select-none"
                draggable={false}
              />
            </div>

            <div className="mt-6 text-center text-white">
              {(() => {
                const { name, year } = splitTitle(selectedTitle);
                return (
                  <>
                    <p className="text-2xl font-semibold">{name}</p>
                    {year && (
                      <p className={`text-lg ${parseInt(year) === maxYear ? 'font-bold' : 'font-bold'}`}>
                        ({year})
                      </p>
                    )}
                  </>
                );
              })()}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
