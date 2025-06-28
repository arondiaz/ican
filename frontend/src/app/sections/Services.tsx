/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import FilteredCards from "../components/FilteredCards";
import { IWorker } from "../utils/interface";
import { Skeleton } from "../components/Skeleton";
import { MapPin, Search, Tag } from "lucide-react";
import Header from "../components/Header";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas las ciudades");
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [visibleWorkers, setVisibleWorkers] = useState<IWorker[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 8;

  const categoryOptions = [
    { value: "Todas", name: "Todas" },
    { value: "1", name: "Electricista" },
    { value: "2", name: "Plomero" },
    { value: "3", name: "Carpintero" },
    { value: "4", name: "Gasista" },
    { value: "5", name: "Mecanico" },
    { value: "6", name: "Gomero" },
    { value: "7", name: "Instalador de aire" },
    { value: "8", name: "Cerrajero" },
    { value: "9", name: "Jardinero" },
    { value: "10", name: "Limpieza" },
  ];

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_API;

    const getAllWorkers = async () => {
      try {
        const allWorkers = await fetch(`${URL}/workers`);
        const data = await allWorkers.json();
        setWorkers(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllWorkers();
  }, []);

  const filtered = workers.filter((worker) => {
    const matchCategory =
      selectedCategory === "Todas" ||
      worker.categories?.some((cat) => cat.name === selectedCategory);
    const matchCity =
      selectedCity === "Todas las ciudades" || worker.city === selectedCity;
    return matchCategory && matchCity;
  });

  // Reset when filters change
  useEffect(() => {
    setVisibleWorkers(filtered.slice(0, itemsPerPage));
    setPage(1);
  }, [selectedCategory, selectedCity, workers]);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const next = filtered.slice(0, (page + 1) * itemsPerPage);
      setVisibleWorkers(next);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500); // Simula un fetch
  }, [filtered, page, loading]);

  // Intersection observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleWorkers.length < filtered.length
        ) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore, visibleWorkers.length, filtered.length]);

  return (
    <section className="w-full md:container py-12 md:mt-16 bg-slate-400 text-black">
      <div className="space-y-8">
        <div className="py-10 px-4">
          <div className="text-center mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-original rounded-full shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              <Header
                title="Encontrá el servicio que estás buscando..."
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-original bg-clip-text text-transparent leading-tight"
              />
              <h3 className="text-base md:text-xl mt-4 font-light text-black/80">
                Conectamos profesionales calificados con personas que necesitan
                servicios de calidad
              </h3>
            </div>
          </div>

          <div className="pb-8 ">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    Ubicación
                  </h3>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white text-md lg:text-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {["Todas las ciudades", "Rosario", "Casilda", "Santa Fe"].map(
                    (city) => (
                      <option key={city}>{city}</option>
                    )
                  )}
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-6 w-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    Categorías
                  </h3>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white text-md lg:text-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.value} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground my-4">
            Mostrando {visibleWorkers.length} de {filtered.length} resultados
          </div>

          <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
            {visibleWorkers.map((worker) => (
              <FilteredCards key={worker.id} worker={worker} />
            ))}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron servicios con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("Todas");
                  setSelectedCity("Todas las ciudades");
                }}
                className="mt-4"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          <div ref={loaderRef} className="h-10" />
        </div>
      </div>
    </section>
  );
};

export default Services;
