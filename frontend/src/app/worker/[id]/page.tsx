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
  const URL = process.env.NEXT_PUBLIC_API;

  const url = `${URL}/workers/${params}}`;
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();

  return data;
}

const page = async ({ params }: PageProps) => {
  const worker = await getWorkerPerId(params.id);
  return (
    <>
      <Navbar />
      <section className="container w-full md:pt-10 md:-mb-16 h-screen ">
        <WorkerProfile worker={worker} />
      </section>
    </>
  );
};

export default page;
