import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-blue-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <p>S!</p>
      </div>

      <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="flex items-center border border-black">
          <Link href={"/admin/addWorker"}>Agregar</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
