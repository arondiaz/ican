/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense } from "react";
import ResultsContent from "../components/ResultsContent";

const Page = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResultsContent />
    </Suspense>
  );
};

export default Page;
