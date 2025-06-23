"use client";
import { Search, MapPin, User, X } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { SearchSuggestions } from "./search-suggestions";

const heroImages = [
  "/images/hero/cerrajero.webp",
  "/images/hero/obra.webp",
  "/images/hero/mec.webp",
  "/images/hero/elec.webp",
];

// Implementar la interaz IWorker
interface Worker {
  id: string;
  name: string;
  city: string;
  categories: { name: string }[];
  phone?: string;
  description?: string;
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [getWorkers, setGetWorkers] = useState<Worker[]>([]);
  const [results, setResults] = useState<Worker[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const getAllWorkers = async () => {
      try {
        const res = await fetch("http://localhost:4444/workers");
        const data = await res.json();
        setGetWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    getAllWorkers();
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(imageInterval);
  }, []);

  // Configuración mejorada de Fuse.js para búsquedas más flexibles
  const fuseOptions = {
    keys: [
      { name: "name", weight: 0.2 },
      { name: "city", weight: 0.4 },
      { name: "categories.name", weight: 0.4 },
    ],
    threshold: 0.6, // Más permisivo
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 1,
    findAllMatches: true,
  };

  // Función para procesar y mejorar la búsqueda
  const processSearchQuery = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();

    // Detectar patrones como "profesión en ciudad"
    const locationPatterns = [" en ", " de ", " zona ", " barrio "];
    let profession = "";
    let location = "";

    for (const pattern of locationPatterns) {
      if (normalizedQuery.includes(pattern)) {
        const parts = normalizedQuery.split(pattern);
        profession = parts[0].trim();
        location = parts[1].trim();
        break;
      }
    }

    return { profession, location, originalQuery: normalizedQuery };
  };

  // Función de búsqueda mejorada
  const performSearch = (query: string, workers: Worker[]) => {
    if (!query.trim()) return [];

    const { profession, location, originalQuery } = processSearchQuery(query);

    // Si detectamos profesión y ubicación por separado
    if (profession && location) {
      // Buscar por profesión
      const professionFuse = new Fuse(workers, {
        keys: ["categories.name"],
        threshold: 0.4,
        ignoreLocation: true,
      });

      const professionResults = professionFuse.search(profession);
      const professionMatches = professionResults.map((result) => result.item);

      // Filtrar por ubicación dentro de los resultados de profesión
      const locationFuse = new Fuse(professionMatches, {
        keys: ["city"],
        threshold: 0.5,
        ignoreLocation: true,
      });

      const finalResults = locationFuse.search(location);
      return finalResults.map((result) => result.item);
    }

    // Búsqueda general si no se detecta el patrón
    const fuse = new Fuse(workers, fuseOptions);
    const searchResults = fuse.search(originalQuery);
    return searchResults.map((result) => result.item);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // console.log("Búsqueda:", searchQuery);
    // console.log("Total workers:", getWorkers.length);

    const matchedItems = performSearch(searchQuery, getWorkers);

    // console.log("Resultados encontrados:", matchedItems.length);
    // console.log("Resultados:", matchedItems);

    setResults(matchedItems);
    setShowResults(true);
    setIsSearching(false);
  };

  // Búsqueda en tiempo real mientras el usuario escribe
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timeoutId = setTimeout(() => {
        const matchedItems = performSearch(searchQuery, getWorkers);
        setResults(matchedItems);
        setShowResults(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setShowResults(false);
      setResults([]);
    }
  }, [searchQuery, getWorkers]);

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setShowResults(false);
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
  };

  return (
    <section className="relative w-full md:pt-12 md:-mb-16 min-h-[500px] sm:min-h-[700px] md:min-h-[550px] lg:min-h-[600px] flex justify-center  items-start sm:pb-28 overflow-hidden">
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

      <div className="flex justify-center relative z-10  bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl mt-8 md:mt-16 w-1/3">
        <div className="flex flex-col items-center w-full max-w-4xl">
          <h1 className="font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl mb-8 text-white">
            Necesito un..
          </h1>

          <div className="w-full max-w-2xl space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex gap-2 bg-white/95 backdrop-blur-sm border border-white/30 rounded-full p-2 shadow-lg">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Ej: electricista en rosario, plomero zona norte..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-4 md:pl-10 pr-10 text-lg bg-transparent placeholder:text-base md:placeholder:text-lg placeholder:text-gray-500 text-gray-900 border-0 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="h-12 sm:px-4 px-8 bg-dark text-white rounded-full hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50"
                >
                  <Search className="w-5" />
                </button>
              </div>
            </form>

            {/* Sugerencias dinámicas */}
            {getWorkers.length > 0 && !showResults && (
              <SearchSuggestions
                workers={getWorkers}
                onSuggestionClick={(suggestion) => setSearchQuery(suggestion)}
              />
            )}
          </div>

          {/* Resultados de búsqueda */}
          {showResults && (
            <div className="w-full max-w-4xl mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center">
                {results.length > 6 && (
                  <div className="text-center my-4">
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="px-4 py-2 bg-original text-white rounded-md  transition-colors"
                    >
                      Ver todos los resultados ({results.length})
                    </Link>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {results.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-1 ">
                  {results.slice(0, 6).map((worker) => (
                    <div
                      key={worker.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white "
                    >
                      <Link href={`/worker/${worker.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <h4 className="font-semibold text-gray-800">
                              {worker.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {worker.city}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {worker.categories.map((category, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-2">
                    No se encontraron resultados para "{searchQuery}"
                  </p>
                  <p className="text-sm text-gray-500">
                    Intenta con términos como "electricista", "plomero en
                    rosario", etc.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
