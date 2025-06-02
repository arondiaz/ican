import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";

const page = () => {
    
  return (
    <>
      <Navbar />

      <section className="w-full bg-gradient-to-tl from-blue-800  to-blue-50">
        <div className="py-16 md:py-24  ">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <Header
                  title="Sobre ServiciosYa!"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12"
                />
                <h2 className="text-3xl md:text-4xl tracking-tight">
                  Encuentra al profesional
                  <span className="text-blue-900 font-semibold">
                    {" "}
                    que estás buscando
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  ¿Querés publicar tus servicios ?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Es <span className="font-bold">gratis!</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" className="text-lg px-8">
                  Unirme
                </Button>
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
