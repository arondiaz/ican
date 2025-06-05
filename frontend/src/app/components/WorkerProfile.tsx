import React from "react";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Worker {
  id: number;
  name: string;
  description: string;
  phone: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  });
};

const WorkerProfile = ({ worker }: { worker: Worker }) => {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden">
      <div className="bg-blue-800 text-white pb-6 rounded-t-xl">
        <div className="flex justify-start items-center space-y-4">
          <div className="flex m-4  w-20 h-20 border-2 border-white shadow-lg">
            {/* image */}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{worker.name}</h2>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-slate-400 text-black rounded-b-xl">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 ">
            <span>
              Descripción <p className=" mt-1">{worker.description}</p>
            </span>
          </div>
          <div className="flex items-center space-x-3 ">
            <span className="text-sm">Ubicación {worker.city}</span>
          </div>
          <div className="flex items-center space-x-3 ">
            <span className="text-sm">
              Miembro desde {formatDate(worker.createdAt)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Especialidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {worker.categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-1 px-3 py-1"
              >
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="text-white px-4 py-2  rounded-xl bg-blue-800 ">
            <span className="font-bold ">Contactar: </span>
            {worker.phone}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
