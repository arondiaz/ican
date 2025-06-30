/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Users, MapPin } from "lucide-react";

const Page = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // const URL = process.env.NEXT_PUBLIC_API;
    const getMetrics = async () => {
      const res = await fetch("/api/metrics",{
         credentials: "include",
      });

      const data = await res.json();

      setMetrics(data);
    };

    getMetrics();
  }, []);

  if (!metrics || !metrics.porCategoria) {
    return (
      <div className="flex text-center justify-center items-center text-2xl">
        <h3>Cargando métricas...</h3>
      </div>
    );
  }

  const { total, porCategoria, porCiudad } = metrics;

  const porCategorias = Object.entries(porCategoria);
  const porCiudades = Object.entries(porCiudad);

  return (
    <section className="p-10 bg-slate-700 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        Panel de Administración
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4">
          <Users className="w-10 h-10" />
          <div className="flex items-center justify-end">
            <h3 className="text-xl font-semibold">Total de usuarios:</h3>
            <p className="text-3xl font-bold ml-4">{total}</p>
          </div>
        </div>

        {porCategorias.map(([categoria, cantidad]) => (
          <div
            key={categoria}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-center items-center"
          >
            <h4 className="text-lg font-medium">{categoria}</h4>
            <p className="text-2xl font-bold">{cantidad}</p>
          </div>
        ))}

        {porCiudades.map(([categoria, cantidad]) => (
          <div
            key={categoria}
            className="bg-soft text-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-row justify-center items-center"
          >
            <MapPin />
            <h4 className="text-lg font-medium mx-2">{categoria}: </h4>
            <p className="text-2xl font-bold ">{cantidad}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
