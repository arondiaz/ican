"use client";
//import { Search } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const heroImages = [
  "/images/hero/cerrajero.webp",
  "/images/hero/obra.webp",
  "/images/hero/mec.webp",
  "/images/hero/elec.webp",
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(imageInterval);
  }, []);

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
    try {
      if (!searchQuery.trim()) return;

      // Redirige a /resultados?query=...
      router.push(`/results?query=${searchQuery.trim()}`);
    } catch (error) {
      console.error("Error al buscar:", error);
      return [];
    }
  };

  // Búsqueda en tiempo real mientras el usuario escribe
  // useEffect(() => {
  //   if (searchQuery.length >= 2) {
  //     const timeoutId = setTimeout(() => {
  //       const matchedItems = performSearch(searchQuery, getWorkers);
  //       setResults(matchedItems);
  //       setShowResults(true);
  //     }, 300);

  //     return () => clearTimeout(timeoutId);
  //   } else {
  //     setShowResults(false);
  //     setResults([]);
  //   }
  // }, [searchQuery, getWorkers]);

  return (
    <section className="relative w-full md:pt-12 md:-mb-16 min-h-[500px] sm:min-h-[700px] md:min-h-[550px] lg:min-h-[600px] flex justify-center  items-center sm:pb-28 overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="flex justify-center relative z-10  bg-white/5 backdrop-blur-sm p-12 rounded-xl shadow-xl mt-8 md:mt-16 md:w-1/2">
        <div className="flex flex-col  items-center w-full max-w-4xl">
          <h1 className="font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl mb-4 text-white">
            Necesito un..
          </h1>

          <div className="w-full max-w-2xl space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-full p-2 shadow-lg">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ej: electricista en rosario, plomero en casilda..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-4 md:h-10 pl-4 md:pl-10 pr-10 text-md bg-transparent placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-lg placeholder:text-gray-500 text-gray-900 border-0 focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
