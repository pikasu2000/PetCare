// pages/PetDetails.jsx
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import defaultPetImage from "../assets/default_pet_image.jpg";

function PetDetails() {
  const { id } = useParams();
  const { pets } = useSelector((state) => state.pets);

  const petsData = Object.entries(pets).map(([id, pet]) => ({
    id,
    ...pet,
  }));
  const pet = petsData.find((p) => p.id === id);

  if (!pet) return <p className="text-center">Pet not found</p>;

  return (
    <div className="min-h-screen bg-light dark:bg-dark-bg py-20 px-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
        <div className="w-full max-w-md">
          <img
            src={pet.image || defaultPetImage}
            alt={pet.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-8">
            {pet.name}
          </h1>
          <p>
            <b>Breed:</b> {pet.breed || "Unknown"}
          </p>
          <p>
            <b>Age:</b> {pet.age || 0} years
          </p>
          <p>
            <b>Weight:</b> {pet.weight || 0} kg
          </p>
          <p>
            <b>Medical History:</b> {pet.medicalHistory || "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
