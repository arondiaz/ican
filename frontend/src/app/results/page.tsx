"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilteredCards from "../components/FilteredCards";

const Page = () => {
  const [resultSearch, setResultSearch] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const getSearch = async () => {
      const url = `http://localhost:4444/categories/${query}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setResultSearch(data);
      } catch (error) {
        console.log(error);
      }
    };

    getSearch();
  }, []);

  console.log(resultSearch);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
        {resultSearch.length > 1 ? (
          resultSearch.map((worker) => (
            <FilteredCards key={worker.id} worker={worker} />
          ))
        ) : (
          <h1>No hay resultados</h1>
        )}
      </div>
    </>
  );
};

export default Page;
