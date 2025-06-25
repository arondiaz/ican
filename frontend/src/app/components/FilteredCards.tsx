import React from "react";
import Image from "next/image";
import { IWorker } from "../utils/interface";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Props {
  worker: IWorker;
}

const FilteredCards = ({ worker }: Props) => {
  return (
    <Link href={`worker/${worker.id}`}>
      <div
        key={worker.id}
        className="bg-white/80 shadow-sm border hover:shadow-md transition-all cursor-pointer rounded-2xl text-gray-700"
      >
        <div className="aspect-square overflow-hidden ">
          <Image
            src={worker.image || "/placeholder.svg"}
            alt={worker.name}
            className="w-full h-full object-cover rounded-b-3xl rounded-t-2xl p-2"
            width={600}
            height={400}
          />
        </div>
        <div className="p-4 space-y-3  rounded-b-3xl max-w-full">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-base md:text-xl  font-semibold line-clamp-1">
                {worker.name}
              </h4>

              <div className="flex flex-row items-center">
                <MapPin className="hidden md:flex mr-1 h-8" />
                <h3 className="text-sm md:text-base text-muted-foreground">
                  {worker.city}
                </h3>
              </div>
            </div>
            <p className="hidden md:flex text-sm md:text-md text-muted-foreground line-clamp-2">
              {`${worker.description?.slice(0, 30)}...`}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="hidden text-lg font-bold text-primary">
              {worker.phone}
            </span>
          </div>

          <div className="flex flex-col  md:flex-row md:gap-2 max-w-max">
            {worker.categories?.map((cat) => (
              <p
                key={cat.id}
                className="text-sm md:text-md lg:text-base bg-gray-600 px-2 rounded-lg text-white"
              >
                {" "}
                {cat.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilteredCards;
