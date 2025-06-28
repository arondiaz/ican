"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilteredCards from "./FilteredCards";
import { IWorker } from "../utils/interface";

const SearchResults = () => {
  const [resultSearch, setResultSearch] = useState<IWorker[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_API;

    const getSearch = async () => {
      if (!query) return;
      const url = `${URL}/categories/${query}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setResultSearch(data);
      } catch (error) {
        console.log(error);
      }
    };

    getSearch();
  }, [query]);

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-28 md:mt-44">
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

export default SearchResults;
