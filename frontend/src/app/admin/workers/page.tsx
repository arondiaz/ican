"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { IWorker } from "@/app/utils/interface";
import Workers from "@/app/components/AdminComponents/Workers";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas las ciudades");
  const [workers, setWorkers] = useState<IWorker[]>([]);

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_API;
    const getAllWorkers = async () => {
      try {
        const url = `${URL}/workers`;

        const allWorkers = await fetch(url);
        const data = await allWorkers.json();

        setWorkers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllWorkers();
  }, []);

  const categories = [
    "Todas",
    "Electricista",
    "Gasista",
    "Plomero",
    "Instalador de aire",
    "Cerrajero",
    "Mecanico",
    "Gomero",
    "Carpintero",
  ];

  const cities = ["Todas las ciudades", "Rosario", "Casilda", "Santa Fe"];

  const filteredServices = workers.filter((worker) => {
    const categoryMatch =
      selectedCategory === "Todas" ||
      worker.categories?.some((category) => category.name === selectedCategory);

    const cityMatch =
      selectedCity === "Todas las ciudades" || worker.city === selectedCity;

    return categoryMatch && cityMatch;
  });

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-8 ">
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold mt-10">
                Categorías
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    // size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full text-lg underline ${
                      selectedCategory === category
                        ? "text-original"
                        : "text-black"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold mt-6">
                Ubicación
              </h3>
              <div className="w-full max-w-xs">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Mostrando {filteredServices.length} de {workers.length}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {filteredServices.map((worker) => (
              <Workers key={worker.id} worker={worker} />
            ))}
          </div>

          {filteredServices.length === 0 && (
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
        </div>
      </div>
    </section>
  );
};

export default Page;
