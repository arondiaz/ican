import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";
import WorkerProfile from "../../components/WorkerProfile";
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id: string;
  };
};

async function getWorkerPerId(params: string) {
  const url = `http://localhost:4444/workers/${params}}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const page = async ({ params }: PageProps) => {
  const worker = await getWorkerPerId(params.id);

  return (
    <>
      <Navbar />
      <section className="container w-full md:pt-12 md:-mb-16 h-screen ">
        <div className="flex justify-center flex-col">
          <Header title={""} className="uppercase text-4xl font-semibold" />

          <WorkerProfile worker={worker} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default page;
