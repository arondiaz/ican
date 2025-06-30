import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "next/link";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Navbar />

      <section className="w-full  mt-16 min-h-[800px] ">
        <div className="pt-20 ">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Header
                  title="Sobre Servicio Libre"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
                />
                <h2 className="text-3xl md:text-4xl tracking-tight">
                  Encuentra al profesional
                  <span className="text-blue-900 font-semibold">
                    {" "}
                    que estás buscando
                  </span>
                </h2>
                <h4 className="text-lg md:text-2xl pt-6">
                  Éste proyecto nace como un desafío, con la idea de hacer un
                  sitio que pueda ser llevado a producción. Si bien implementé
                  cosas que no conocía para el desarrollo, lo más difícil de
                  todo proyecto es que tenga usuarios reales. Por ésto, usaré
                  datos ficticios.
                  <br /> <br />
                  Si estás interesado en formar parte de Servicio Libre puedes
                  llenar el formulario, es gratis y lo seguirá siendo.
                  <br />
                </h4>

                <h3 className="text-lg md:text-2xl pt-6">
                  Hecho con ❤️ React, Next.js, Express, Sequelize.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10  bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  ¿Querés publicar tus servicios ?
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeOwhnVO0-E2z96xMZjgO61q4Uq6jv4YXvloeEm8cW8LTXjKg/viewform?usp=header"
                  target="blank"
                >
                  <Button variant="primary" className="text-lg px-8">
                    Unirme
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
