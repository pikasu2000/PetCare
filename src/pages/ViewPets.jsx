// pages/ViewPets.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewPets() {
  const { pets, loading, error } = useSelector((state) => state.pets);
  const petsData = Object.entries(pets).map(([id, pet]) => ({
    id,
    ...pet,
  }));
  return (
    <div className="min-h-screen bg-light dark:bg-dark-bg py-20 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-dark-text mb-8">
        Your Pets
      </h1>
      {loading.pets ? (
        <p>Loading...</p>
      ) : error.pets ? (
        <p className="text-red-500">
          {typeof error.pets === "string"
            ? error.pets
            : error.pets?.message || JSON.stringify(error.pets)}
        </p>
      ) : petsData || petsData.length === 0 ? (
        <p>
          No pets found. <Link to="/add-pets">Add a pet</Link>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {petsData.map((pet) => (
            <div
              key={pet.id}
              className="bg-white dark:bg-dark-bg p-6 rounded-lg border"
            >
              <h2>{pet.name}</h2>
              <Link to={`/pets/pets-details/${pet.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewPets;
