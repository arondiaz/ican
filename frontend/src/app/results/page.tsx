/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilteredCards from "../components/FilteredCards";
import { IWorker } from "../utils/interface";

const Page = () => {
  const [resultSearch, setResultSearch] = useState([] as IWorker[]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const URL = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const getSearch = async () => {
      const url = `${URL}/categories/${query}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setResultSearch(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    };

    if (URL && query) getSearch();
  }, [URL, query]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
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
    </>
  );
};

export default Page;
