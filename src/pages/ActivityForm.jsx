import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addActivity, fetchPets } from "../features/pets/petsActions";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/ui/Button";

function ActivityForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets, loading, error } = useSelector((state) => state.pets);
  const [formData, setFormData] = useState({
    petId: "",
    type: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPets())
      .unwrap()
      .catch((err) => {
        toast.error(`Error fetching pets: ${err || "Something went wrong"}`);
      });
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!formData.petId) errors.petId = "Pet is required";
    if (!formData.type) errors.type = "Activity type is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await dispatch(addActivity(formData)).unwrap();
      toast.success("Activity added successfully!");
      setFormData({ petId: "", type: "", notes: "" });
      setFormErrors({});
      navigate("/dashboard");
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
    <div className="min-h-screen bg-light dark:bg-zinc-800 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 border-1 dark:border-green-500 rounded-2xl shadow-lg">
        <h2 className="text-center font-bold text-3xl sm:text-4xl mb-8 text-gray-800 dark:text-white border-b-2 border-green-500 pb-2">
          Log Activity
        </h2>
        {error && (
          <p className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2 text-center mb-6">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="petId"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              Pet *
            </label>
            <select
              id="petId"
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              className={`w-full py-2 px-4 rounded-full border ${
                formErrors.petId
                  ? "border-red-500"
                  : "border-gray-300 dark:border-dark-border"
              } bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
              disabled={loading}
              aria-label="Select pet"
              aria-describedby={formErrors.petId ? "petId-error" : undefined}
            >
              <option value="">Select a pet</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
            {formErrors.petId && (
              <p
                id="petId-error"
                className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
              >
                {formErrors.petId}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              Activity Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full py-2 px-4 rounded-full border ${
                formErrors.type
                  ? "border-red-500"
                  : "border-gray-300 dark:border-dark-border"
              } bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200`}
              disabled={loading}
              aria-label="Select activity type"
              aria-describedby={formErrors.type ? "type-error" : undefined}
            >
              <option value="">Select type</option>
              <option value="walk">Walk</option>
              <option value="feeding">Feeding</option>
              <option value="medication">Medication</option>
              <option value="playtime">Playtime</option>
            </select>
            {formErrors.type && (
              <p
                id="type-error"
                className="text-red-500 dark:text-red-400 text-sm mt-1 bg-red-50 dark:bg-red-900 rounded px-2 py-1"
              >
                {formErrors.type}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Enter activity notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              disabled={loading}
              aria-label="Activity notes"
              rows="4"
            />
          </div>

          <Button type="submit" disabled={loading} asChild className="mt-2">
            {loading ? "Adding..." : "Add Activity"}
          </Button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default ActivityForm;
