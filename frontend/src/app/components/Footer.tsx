"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
// import SocialLkn from "@/app/assets/social-linkedin.svg";
// import SocialGit from "@/app/assets/social-github.png";

const navItems = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/servicios",
    label: "Servicios",
  },
  {
    href: "/about",
    label: "Sobre ServiciosYa",
  },
];

const Footer = () => {
  const [copyEmail, setCopyEmail] = useState(false);

  const email = "arondiaz.cpn@gmail.com";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyEmail(true);
      setTimeout(() => setCopyEmail(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <footer className="bg-dark text-white ">
      <div className="container">
        <div className="pt-16">
          <div className="grid md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-4xl mt-4 font-extralight md:text-7xl lg:text-8xl">
                ServiciosYa!
              </h2>
              <div className="my-10 mb-2 flex flex-row gap-2">
                <Button
                  onClick={copy}
                  className="text-base md:text-xl "
                  variant="secondary"
                  iconAfter={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  }
                >
                  {email}
                </Button>
                {copyEmail && (
                  <svg
                    width="45px"
                    height="45px"
                    viewBox="-2.4 -2.4 28.80 28.80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    strokeWidth="0.00024000000000000003"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                        fill="#39d719"
                      />{" "}
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <div className="md:col-span-1">
              <nav className="sm:flex-row flex md:flex-col gap-8 mt-8 md:mt-16 md:items-end ">
                {navItems.map(({ href, label }) => (
                  <Link href={href} key={label}>
                    <Button variant="text" className="text-lg md:text-xl ">
                      {" "}
                      {label}{" "}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-50 items-center gap-4">
          <p className="py-16 text-white/30 text-sm">2025</p>

          <Link href={"https://www.linkedin.com/in/arondiaz/"} target="blank">
            {/* <Image
              src={SocialLkn}
              alt="link"
              width={50}
              className="w-16 md:w-16 "
            /> */}
          </Link>
          <Link href={"https://github.com/arondiaz/"} target="blank">
            {/* <Image
              src={SocialGit}
              alt="git"
              width={36}
              className="w-11 md:w-11 "
            /> */}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
