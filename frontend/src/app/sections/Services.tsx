"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Header from "../components/Header";
import FilteredCards from "../components/FilteredCards";
import { IWorker } from "../utils/interface";
import { Skeleton } from "../components/Skeleton";

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
    { value: "1", name: "Electricista" },
    { value: "2", name: "Plomero" },
    { value: "3", name: "Carpintero" },
    { value: "4", name: "Gasista" },
    { value: "5", name: "Mecanico" },
    { value: "6", name: "Gomero" },
    { value: "7", name: "Instalador de aire" },
    { value: "8", name: "Cerrajero" },
  ];

  useEffect(() => {
    const getAllWorkers = async () => {
      try {
        const allWorkers = await fetch("http://localhost:4444/workers");
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
    <section className="w-full py-12 md:mt-16 bg-slate-400 text-black">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="text-center">
            <Header
              title="Encontrá el servicio que estás buscando..."
              className="text-3xl font-bold tracking-tighter md:text-4xl"
            />
          </div>

          <div className="flex justify-start items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold ">
                Ubicación
              </h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-black w-full max-w-xs px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none"
              >
                {["Todas las ciudades", "Rosario", "Casilda", "Santa Fe"].map(
                  (city) => (
                    <option key={city}>{city}</option>
                  )
                )}
              </select>
            </div>

            <div className="ml-8">
              <h3 className="text-2xl md:text-3xl font-semibold">
                Categorías
              </h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-black w-full max-w-xs px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none"
              >
                {categoryOptions.map(
                  (cat) => (
                    <option key={cat.value}>{cat.name}</option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Mostrando {visibleWorkers.length} de {filtered.length} resultados
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

// Componente SkeletonCard definido arriba
