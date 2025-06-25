import { Briefcase, Calendar, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { IWorker } from "../utils/interface";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  });
};

const WorkerProfile = ({ worker }: { worker: IWorker }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-20 md:mt-4">
      <div className="overflow-hidden ">
        <div className="bg-gradient-to-br from-original to-dark text-white p-6 rounded-t-2xl">
          <div className="flex flex-col justify-center items-center space-x-4">
            <div className="w-24 h-24 border-4 border-white/20 rounded-full  overflow-hidden bg-blue-500 flex items-center justify-center">
              <Image
                src={worker.image || `/placeholder.svg?height=80&width=80`}
                alt={worker.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center flex-col mt-4">
              <h2 className="text-2xl font-bold mb-1">{worker.name}</h2>
              <div className="flex items-center text-blue-100 bg-white/20 rounded-2xl px-4 py-1 ">
                <MapPin className="w-5 h-5 mr-1" />
                <span className="text-lg">{worker.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-slate-300 rounded-b-3xl">
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 mb-2">
              <User className="w-6 h-6 mr-2" />
              <span className="font-semibold  text-lg tracking-wide">
                Descripción
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg ">
              {worker.description}
            </p>
          </div>

          <div className="flex items-center text-gray-700 text-lg">
            <Calendar className="w-6 h-6 mr-2" />
            <p>
              <span className="font-semibold text-lg"> Miembro desde: </span>{" "}
              {formatDate(worker.createdAt)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <Briefcase className="w-6 h-6 mr-2" />
              <span className="font-semibold text-lg  tracking-wide">
                Especialidades
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {worker.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-dark text-white px-4 rounded-xl"
                >
                  <p className="text-lg"> {category.name} </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 w-full ">
            <button className="w-full rounded-3xl flex  justify-center items-center  bg-original hover:bg-dark text-white shadow-md transition-all duration-200 hover:shadow-lg py-4">
              <Phone className="w-7 h-7 mr-2" />
              <div className="flex flex-col items-center">
                <span className="font-semibold text-xl">
                  {" "}
                  Contactar ahora:{" "}
                </span>{" "}
                <span className="text-xl font-bold"> {worker.phone}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
