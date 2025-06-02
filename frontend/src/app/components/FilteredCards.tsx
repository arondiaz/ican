import React from "react";
import Image from "next/image";
import { IWorker } from "../utils/interface";

interface Props {
  worker: IWorker;
}

const FilteredCards = ({ worker }: Props) => {
  return (
    <div
      key={worker._id}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all cursor-pointer"
    >
      <div className="aspect-square overflow-hidden rounded-2xl">
        <Image
          src={worker.image || "/placeholder.svg"}
          alt={worker.name}
          className="w-full h-full object-cover "
          width={45}
          height={45}
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="md:text-xl lg:text-2xl font-semibold text-lg line-clamp-1">
              {worker.name}
            </h4>

            <h3 className="text-sm md:text-base text-muted-foreground">
              {worker.city}
            </h3>
          </div>
          <p className="hidden text-sm text-muted-foreground line-clamp-2">
            {worker.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="hidden text-lg font-bold text-primary">
            {worker.phone}
          </span>
        </div>

        <div className="flex flex-row gap-2 md:gap-4">

       {worker.categories?.map((cat) => (
            <p className="text-sm md:text-md"> {cat.name}</p>
          ))}
        </div>
   
     
      </div>
    </div>
  );
};

export default FilteredCards;
