import DisplayWorkersPerCat from "@/app/components/DisplayWorkersPerCat";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";

type PageProps = {
  params: {
    name: string;
  };
};

async function getWorkersPerCategory(params: string) {
  const URL = process.env.NEXT_PUBLIC_API;

  const url = `${URL}/categories/${params}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const page = async ({ params }: PageProps) => {
  const worker = await getWorkersPerCategory(params.name);

  return (
    <>
      <Navbar />
      <section className="container w-full md:pt-12 md:-mb-16 h-screen ">
        <div className="flex justify-center">
          <Header
            title={`${params.name}s`}
            className="uppercase text-4xl font-semibold"
          />
        </div>

        <DisplayWorkersPerCat workers={worker.workers} />
      </section>

      <Footer />
    </>
  );
};

export default page;
