import React from "react";
import heroImg from "../assets/hero.jpg";
import HeroSectionForm from "./HeroSectionForm";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col  items-center justify-center text-white text-center px-4"
      style={{ backgroundImage: `url(${heroImg})` }}
      role="banner"
      aria-label="Hero section for pet care services"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 mt-6">
        Doorstep Pet Care Services for Every Pet Parent
      </h1>
      <button
        className=" bg-gradient-to-r from-green-300 to-green-500  hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 text-white px-6 py-2 rounded-lg mb-8 transition-all duration-300"
        onClick={() => navigate("/services")} // Adjust route as needed
        aria-label="Get started with pet care services"
      >
        Get Started
      </button>
      <HeroSectionForm />
    </div>
  );
}

export default HeroSection;
