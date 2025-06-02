import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Footer from "./components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
};

export default page;
