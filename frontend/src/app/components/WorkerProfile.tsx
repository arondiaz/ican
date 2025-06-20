import { Briefcase, Calendar, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { IWorker } from "../utils/interface";


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  });
};

const WorkerProfile = ({ worker }: { worker: IWorker}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-20 md:mt-4">
      <div className="overflow-hidden shadow-lg">
        <div className="bg-gradient-to-br from-original to-dark text-white p-6 rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border-4 border-white/20 rounded-full shadow-lg overflow-hidden bg-blue-500 flex items-center justify-center">
              <Image
                src={worker.image || `/placeholder.svg?height=80&width=80`}
                alt={worker.name}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center flex-col">
              <h2 className="text-2xl font-bold mb-1">{worker.name}</h2>
              <div className="flex items-center text-blue-100">
                <MapPin className="w-6 h-6 mr-1" />
                <span className="text-lg">{worker.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-slate-300">
          {/* Descripción */}
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

          {/* Información adicional */}
          <div className="flex items-center text-gray-700 text-lg">
            <Calendar className="w-6 h-6 mr-2" />
            <p>
              <span className="font-semibold text-lg"> Miembro desde: </span>{" "}
              {formatDate(worker.createdAt)}
            </p>
          </div>

          {/* Especialidades */}
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

          {/* Botón de contacto */}
          <div className="pt-4 w-full">
            <button className="w-full flex justify-center items-center  bg-original hover:bg-dark text-white shadow-md transition-all duration-200 hover:shadow-lg py-4">
              <Phone className="w-5 h-5 mr-2" />
              <p className="text-lg">
                {" "}
                <span className="font-semibold text-lg"> Contactar: </span>{" "}
                {worker.phone}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
