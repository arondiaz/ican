"use client";
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import FilteredCards from "../components/FilteredCards";
import { IWorker } from "../utils/interface";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas las ciudades");

  const categories = [
    "Todas",
    "Electricista",
    "Gasista",
    "Plomero",
    "Instalador de aire",
    "Cerrajero",
    "Mecanico",
    "Gomero",
  ];

  const cities = ["Todas las ciudades", "Rosario", "Casilda", "Santa Fe"];

  const workers:IWorker[] = [
    {
      _id: 1,
      name: "Mario",
      categories:  [{ name: "Plomero" }, { name: "Gomero" }],
      phone: "4500",
      city: "Rosario",
      image: "/placeholder.svg?height=200&width=200",
      description: "trabajo rapido",
    },
    {
      _id: 2,
      name: "Perico",
      categories: [{ name: "Plomero" }],
      phone: "10000",
      city: "Rosario",
      image: "/placeholder.svg?height=200&width=200",
      description: "trabajo rapido",
    },
    {
      _id: 3,
      name: "Romeo",
      categories:  [{ name: "Gomero" }],
      phone: "1450",
      city: "Santa Fe",
      image: "/placeholder.svg?height=200&width=200",
      description: "trabajo rapido",
    },
    {
      _id: 4,
      name: "Rodrigo",
      categories: [{ name: "Gomero" }],
      phone: "€320",
      city: "Casilda",
      image: "/placeholder.svg?height=200&width=200",
      description: "trabajo rapido",
    },
    {
      _id: 5,
      name: "Pepe",
      categories: [{ name: "Electricista" }],
      phone: "2424",
      city: "Santa Fe",
      image: "/placeholder.svg?height=200&width=200",
      description: "trabajo rapido",
    },
  ];

  const filteredServices = workers.filter((product) => {
    const categoryMatch = selectedCategory === "Todas" || product.categories?.some((category) => category.name === selectedCategory);

    const cityMatch = selectedCity === "Todas las ciudades" || product.city === selectedCity;

    return categoryMatch && cityMatch;
  });

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="space-y-8 ">
          <div className="flex flex-col justify-center items-center text-center space-y-4 ">
            <Header
              title="ServicioYa!"
              className=" text-3xl font-bold tracking-tighter sm:text-4xl"
            />

            <p className="text-xl lg:text-xl">
              Encontrá el servicio que estás buscando
            </p>
          </div>

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
                        ? "text-blue-600"
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
            Mostrando {filteredServices.length} de {workers.length} productos
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {filteredServices.map((worker) => (
              <FilteredCards key={worker._id} worker={worker} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No se encontraron productos con los filtros seleccionados.
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

export default Services;
