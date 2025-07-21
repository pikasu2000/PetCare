import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddPets } from "../features/pets/petsActions";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/ui/Button";

function PetProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.pets);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    medicalHistory: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.breed.trim()) errors.breed = "Breed is required";
    if (!formData.age || formData.age <= 0)
      errors.age = "Age must be a positive number";
    if (!formData.weight || formData.weight <= 0)
      errors.weight = "Weight must be a positive number";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields correctly");
      return;
    }
    try {
      await dispatch(AddPets(formData)).unwrap();
      toast.success("Pet profile added successfully!");
      setFormData({
        name: "",
        breed: "",
        age: "",
        weight: "",
        medicalHistory: "",
      });
      setFormErrors({});
      navigate("/view-pets");
    } catch (err) {
      toast.error(`Error: ${err || "Something went wrong"}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  return (
    <div className="min-h-screen bg-light dark:bg-zinc-800  flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 dark:border-1 dark:border-green-500 rounded-2xl shadow-lg">
        <h2 className="text-center font-bold text-3xl sm:text-4xl mb-8 text-gray-800 dark:text-white border-b-2 border-green-500 pb-2">
          Add Pet Profile
        </h2>
        {error?.pets && (
          <p className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2 text-center mb-6">
            {typeof error.pets === "string"
              ? error.pets
              : "An error occurred while adding the pet"}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
              >
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter pet name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full py-2 px-4 rounded-full border ${
                  formErrors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200`}
                aria-label="Pet name"
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <p
                  id="name-error"
                  className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
                >
                  {formErrors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="breed"
                className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
              >
                Breed *
              </label>
              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="Enter breed"
                value={formData.breed}
                onChange={handleChange}
                className={`w-full py-2 px-4 rounded-full border ${
                  formErrors.breed
                    ? "border-red-500"
                    : "border-gray-300 dark:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200`}
                aria-label="Pet breed"
                aria-describedby={formErrors.breed ? "breed-error" : undefined}
              />
              {formErrors.breed && (
                <p
                  id="breed-error"
                  className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
                >
                  {formErrors.breed}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
              >
                Age (years) *
              </label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full py-2 px-4 rounded-full border ${
                  formErrors.age
                    ? "border-red-500"
                    : "border-gray-300 dark:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200`}
                aria-label="Pet age"
                aria-describedby={formErrors.age ? "age-error" : undefined}
              />
              {formErrors.age && (
                <p
                  id="age-error"
                  className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
                >
                  {formErrors.age}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
              >
                Weight (kg) *
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                placeholder="Enter weight"
                value={formData.weight}
                onChange={handleChange}
                className={`w-full py-2 px-4 rounded-full border ${
                  formErrors.weight
                    ? "border-red-500"
                    : "border-gray-300 dark:border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200`}
                aria-label="Pet weight"
                aria-describedby={
                  formErrors.weight ? "weight-error" : undefined
                }
              />
              {formErrors.weight && (
                <p
                  id="weight-error"
                  className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
                >
                  {formErrors.weight}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="medicalHistory"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              Medical History (Optional)
            </label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              placeholder="Enter medical history"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              aria-label="Pet medical history"
              rows="5"
            />
          </div>

          <Button asChild type="submit">
            {loading.pets ? "Adding..." : "Add Pet"}
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default PetProfileForm;
