"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import S from "../assets/s.png";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const URL = process.env.NEXT_PUBLIC_API;

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <section className="bg-dark flex justify-center items-center h-[calc(100vh-80px)] text-gray-700">
        <div className="flex justify-center items-center">
          <div className=" bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex justify-center items-center mb-4">
              <Image
                src={S}
                alt="serviciosya! logo"
                width={55}
                height={55}
                className="rounded-xl"
                priority
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-center font-semibold">
                <h3>Panel Admin</h3>
              </div>
              <label className="block text-md font-medium mb-1">Mail</label>
              <input
                type="text"
                placeholder=""
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-original"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder=""
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-original"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center items-center my-2">
              <p className="text-md">
                No tienes cuenta?
                <Link href="/about">
                  {" "}
                  <span className="text-soft-variant hover:text-dark-variant font-semibold">
                    Unirme
                  </span>{" "}
                </Link>
              </p>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-original  text-white font-semibold py-2 px-4 rounded-lg "
            >
              Ingresar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
