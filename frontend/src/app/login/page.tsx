"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4444/login", {
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
      <section className="bg-original flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="flex justify-center items-center">
          <div className=" bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-original mb-6">
              S!
            </h1>

            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
