"use client";
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

const Hero = () => {
  const [currentCategoriesIndex, setCurrentCategoriesIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoriesIndex((prevIndex) =>
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // ógica de búsqueda
    console.log("Buscando:", searchQuery);
  };
  return (
    <section className="w-full md:pt-12 md:-mb-16 h-screen bg-dark flex justify-center items-center sm:pb-28">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Necesito un..
            </h1>
            <div className="h-14 flex items-center justify-center">
              <p className="text-2xl md:text-3xl lg:text-4xl ">
                <span
                  key={currentCategoriesIndex}
                  className="text-primary font-semibold animate-pulse"
                >
                  {categories[currentCategoriesIndex]}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-4">
            <form
              onSubmit={handleSearch}
              className="flex gap-2 border border-black/30 rounded-xl"
            >
              <div className="relative flex-1">
                <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg bg-transparent placeholder:text-black"
                />
              </div>
              <button type="submit" className="h-12 px-8 ">
                Buscar
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

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Ofrecen su servicio</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground">Usuarios</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Soporte</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Argentino</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
