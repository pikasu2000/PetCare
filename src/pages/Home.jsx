import React from "react";
import phonesection1 from "../assets/download.webp";
import petcare2 from "../assets/pet-care.avif";
import HeroSection from "../components/HeroSection";
import { useNavigate } from "react-router-dom";
import { Check, PawPrint, Quote, SearchIcon, ShieldCheck } from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PawPrint />,
      title: "Save time and sanity",
      description:
        "Avoid those awkward phone calls — filter by same-day caregivers for last-minute care.",
    },
    {
      icon: <SearchIcon />,
      title: "One platform, all needs",
      description:
        "From dogwalkers and overnight sitters to boarders and trainers—it's all here and easy to find.",
    },
    {
      icon: <ShieldCheck />,
      title: "Leading the way on safety",
      description:
        "All individual caregivers on our platform start with a background check.*",
    },
  ];

  const services = [
    {
      title: "Pet Sitter",
      description:
        "Find trusted sitters who will care for your pet in the comfort of your home while you're away—including feeding, companionship, potty breaks, and medication administration if needed.",
      image: "https://deepetservices.com/assets/images/blog/blog5.png", // Replace with local asset path
      route: "/services/pet-sitting",
    },
    {
      title: "Dog Walker",
      description:
        "Hire experienced dog walkers to give your pet the exercise and attention they need, tailored to their energy level and preferences.",
      image:
        "https://content.petbacker.com/images/cms/servicecovers/dog-boarding.jpg", // Replace with local asset path
      route: "/services/dog-walking",
    },
  ];

  const serviceList = [
    "Pet Sitting",
    "Dog Walking",
    "Pet Grooming",
    "Veterinary Care",
    "Pet Training",
    "Pet Boarding",
  ];

  const testimonials = [
    {
      quote:
        "Thorough and thoughtful. Care.com helped connect me with someone I can trust and I had many options to choose from.",
      author: "Nancy S.",
    },
    {
      quote:
        "Care.com is a trustworthy, professional, safe, and reliable resource.",
      author: "LaToya C.",
    },
    {
      quote:
        "My caregiver from Care.com was so very good and helpful. I'm grateful to care.com for their help in finding her.",
      author: "Alice P.",
    },
  ];

  return (
    <div>
      <HeroSection />

      <section
        className="p-4 sm:p-8 mt-12 max-w-7xl mx-auto dark:bg-zinc-800 dark:text-white"
        role="region"
        aria-label="Why choose us"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          When life gets furry, you can turn to us
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg flex items-center p-7"
              >
                <div className="p-3 rounded-full bg-primary text-white">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/4 bg-purple-200 px-4 pt-4 rounded-2xl overflow-hidden shadow-md">
            <img
              className="object-contain w-full h-90"
              src={petcare2}
              alt="Pet care services"
            />
          </div>
          <div className="w-full lg:w-1/4 bg-green-100 rounded-2xl overflow-hidden shadow-md">
            <img
              className="object-cover w-full h-96"
              src={phonesection1}
              alt="Mobile app for pet care services"
            />
          </div>
        </div>
      </section>

      <section
        className="p-4 sm:p-8 mt-12 bg-green-200"
        role="region"
        aria-label="Pet care services"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          Pet care you can feel confident about
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              route={service.route}
            />
          ))}
        </div>

        <div className="bg-white mt-12 p-6 sm:p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Pet care services tailored to your needs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {serviceList.map((service, index) => (
              <div key={index} className="flex items-center justify-center">
                <Check className="text-primary" />
                <p className="ml-2 text-gray-700">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="p-4 sm:p-8 mt-12"
        role="region"
        aria-label="How it works"
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2">
            <img
              className="object-cover w-full h-80 sm:h-96 rounded-2xl"
              src="https://content.petbacker.com/images/cms/servicecovers/pet-house-sitting.jpg"
              alt="How pet care services work"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
              Get started for free
            </h1>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="px-4 py-2 bg-primary text-white rounded-full">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-xl">
                    Share your care needs
                  </h3>
                  <p className="text-gray-600">
                    From pay to schedule to specific needs—share what you're
                    looking for.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="px-4 py-2 bg-primary text-white rounded-full">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Browse caregivers</h3>
                  <p className="text-gray-600">
                    Check out profiles, compare qualifications, and read reviews
                    from people like you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="px-4 py-2 bg-primary text-white rounded-full">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Hire with Premium</h3>
                  <p className="text-gray-600">
                    Start your search for free and upgrade to Premium when
                    you're ready to hire.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="mt-6 py-3 px-6 bg-primary hover:bg-primary-dull text-white rounded-lg font-semibold transition"
              onClick={() => navigate("/signup")}
              aria-label="Get started with pet care services"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section
        className="p-4 sm:p-8 mt-12 bg-gray-50"
        role="region"
        aria-label="Testimonials"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Trusted by families like yours
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
