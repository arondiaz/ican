"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import S from "../assets/s.png";
import { motion, useAnimate } from "framer-motion";

const navItems = [
  { href: "/about", name: "Sobre Servicio Libre" },
  { href: "/login", name: "Login" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnitame] = useAnimate();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [topLineScope.current, { transform: "translateY(4px) rotate(45deg)" }],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          { transform: "translateY(-4px) rotate(-45deg)" },
        ],
      ]);
      navAnitame(
        navScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        }
      );
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            transform: "translateY(0px) rotate(0deg)",
          },
        ],
      ]);

      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            transform: "translateY(0px) rotate(0deg)",
          },
        ],
      ]);
      navAnitame(navScope.current, {
        height: 0,
      });
    }
  }, [
    isOpen,
    topLineAnimate,
    topLineScope,
    bottomLineAnimate,
    bottomLineScope,
    navAnitame,
    navScope,
  ]);
  return (
    <header className="max-w-full bg-white ">
      <div
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-slate-500 z-40 "
        ref={navScope}
      >
        <nav className="mt-20 flex flex-col h-full ">
          {navItems.map(({ href, name }) => (
            <Link
              href={href}
              key={name}
              className="text-stone-200 border-t border-slate-700 last:border-b py-8 group/nav-item relative "
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="container !max-w-full flex items-center justify-between">
                <span className="text-stone-200 text-3xl group-hover/nav-item:pl-4 transition-all duration-500">
                  {name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-stone-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
              <div className="absolute w-full h-0 bg-slate-00 group-hover/nav-item:h-full transition-all duration-550 bottom-0 -z-20"></div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="container max-w-full flex justify-between items-center h-20 ">
          <Link href={"/"}>
            <div className="flex flex-row items-center gap-4">
              <Image
                src={S}
                alt="serviciolibre logo"
                width={55}
                height={55}
                className="rounded-xl"
                priority
              />
              <h2 className="hidden md:flex text-xl font-bold text-black tracking-wide">
                Servicio Libre
              </h2>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="lg:hidden relative size-11 border border-black/80 rounded-full inline-flex items-center justify-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <motion.rect
                  x="3"
                  y="7"
                  width="18"
                  height="2"
                  fill="currentColor"
                  ref={topLineScope}
                />
                <motion.rect
                  x="3"
                  y="15"
                  width="18"
                  height="2"
                  fill="currentColor"
                  ref={bottomLineScope}
                />
              </svg>
            </div>

            <div className="hidden lg:flex justify-end gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-all ${
                    item.name === "Login"
                      ? "bg-original text-white hover:bg-dark"
                      : "text-black hover:text-dark "
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
