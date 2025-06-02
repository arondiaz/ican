import React from "react";
import Link from "next/link";
import Image from "next/image";
import S from "../assets/s.png";

const navItems = [
  { href: "/servicios", name: "Servicios" },
  { href: "/about", name: "Sobre nosotros" },
  { href: "/contact", name: "Contacto" },
];

const Navbar = () => {
  return (
    <header className="bg-blue-50">
      <div className="container max-w-full flex justify-between items-center h-20">
        <Link href={"/"}>
          <div className="flex flex-row items-center gap-6">
            <Image src={S} alt="serviciosya! logo" width={55} height={55} className="rounded-xl" priority/>
            <h2 className="hidden md:flex text-xl font-bold">ServiciosYa!</h2>
          </div>
        </Link>

        <div className="md:hidden mr-8 flex items-center gap-4">
          <div
            className="relative size-11 border rounded-full inline-flex items-center justify-center cursor-pointer"
            // onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <rect
                x="3"
                y="7"
                width="18"
                height="2"
                fill="currentColor"
                className="text-black"
              />
              <rect x="3" y="15" width="18" height="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="hidden md:inline-flex  items-center gap-4">
          {navItems.map((nav) => (
            <Link href={nav.href} key={nav.name}>
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
