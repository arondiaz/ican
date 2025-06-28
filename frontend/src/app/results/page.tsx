"use client";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import SearchResults from "../components/SearchResults";

const Page = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="flex justify-center items-center"><h2>Cargando resultados...</h2></div>}>
        <SearchResults />
      </Suspense>
    </>
  );
};

export default Page;
