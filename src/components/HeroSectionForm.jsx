import React, { useState } from "react";

function HeroSectionForm() {
  const [formData, setFormData] = useState({
    location: "",
    petType: "Cat",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic (e.g., API call or navigation)
    console.log("Form submitted:", formData);
  };

  const services = [
    "Pet Boarding",
    "House Sitting",
    "Dog Walking",
    "Pet Grooming",
    "Veterinary Care",
    "Veterinary Care",
  ];

  return (
    <div className="bg-white py-4 px-4 text-black w-full max-w-4xl mt-10 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="w-full space-y-2">
        <p className="text-left font-medium">I am Looking for</p>
        <div className="flex flex-wrap justify-between items-center ">
          {services.map((service, index) => (
            <button
              key={index}
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white transition-all ease-linear duration-300 "
              onClick={() => console.log(`Selected service: ${service}`)} // Replace with actual navigation or logic
            >
              {service}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-full sm:w-1/2">
            <p className="text-left font-medium">Near Me</p>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter City or Postal Code"
              className="py-2 px-4 mt-1 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Enter city or postal code"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <p className="text-left font-medium">My Pet Type</p>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              className="py-2 px-4 mt-1 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Select pet type"
            >
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Fish">Fish</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 mt-6 py-2 bg-gradient-to-r from-green-300 to-green-500  hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 text-white rounded-lg transition-all duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroSectionForm;
