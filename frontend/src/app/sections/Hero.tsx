"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const categories = [
  "electricista",
  "gasista",
  "plomero",
  "instalador de aire",
  "cerrajero",
  "mecanico",
  "gomero",
];

const heroImages = [
  "/images/hero/mec.jpg",
  "/images/hero/cerrajero.jpg",
  "/images/hero/elec.jpg",
  "/images/hero/obra.jpg",
];

const Hero = () => {
  //const [currentCategoriesIndex, setCurrentCategoriesIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentCategoriesIndex((prevIndex) =>
  //       prevIndex === categories.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(imageInterval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };
  return (
    <section className="relative w-full md:pt-12 md:-mb-16 h-[500px] sm:h-[700px] md:h-[550px] lg:h-[600px] flex justify-center md:justify-start items-center sm:pb-28 overflow-hidden">
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
      <div className="flex justify-start relative z-10 md:ml-40 bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl">
        <div className="flex flex-col items-center ">
          <h1 className=" font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl mb-8">
            Necesito un..
          </h1>
          {/* <div className="mx-4">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white">
                <span
                  key={currentCategoriesIndex}
                  className="text-primary font-semibold animate-pulse"
                >
                  {categories[currentCategoriesIndex]}
                </span>
              </p>


            </div> */}

          <div className="w-full max-w-2xl space-y-4">
            <form
              onSubmit={handleSearch}
              className="flex gap-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-full p-2 shadow-lg"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="¿Qué servicio necesitas?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-4 md:pl-10 pr-4 text-lg bg-transparent placeholder:text-base md:placeholder:text-xl placeholder:text-gray-500 text-gray-900 border-0 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-12 sm:px-4 px-8 bg-dark text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
              >
                <Search className="w-5" />
              </button>
            </form>

            <div className="hidden md:flex justify-center gap-2 text-md lg:text-xl">
              <span>Búsquedas populares:</span>
              {categories.slice(0, 4).map((product, index) => (
                <Link
                  href={`/categories/${product}`}
                  key={index}
                  onClick={() => setSearchQuery(product)}
                  className=" transition-all duration-300 underline "
                >
                  {product}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
