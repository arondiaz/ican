"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FilteredCards from "../components/FilteredCards";
import { IWorker } from "../utils/interface";

const ResultsContent = () => {
  const [resultSearch, setResultSearch] = useState<IWorker[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_API;
    if (!URL || !query) return;

    const getSearch = async () => {
      try {
        const res = await fetch(`${URL}/categories/${query}`);
        const data = await res.json();
        setResultSearch(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSearch();
  }, [query]);

  return (
    <div className="grid grid-cols-1 ...">
      {resultSearch.length > 0 ? (
        resultSearch.map((worker) => (
          <FilteredCards key={worker.id} worker={worker} />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <h2>No hay resultados</h2>
        </div>
      )}
    </div>
  );
};



export default function ResultsClient() {
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <ResultsContent />
    </Suspense>
  );
}