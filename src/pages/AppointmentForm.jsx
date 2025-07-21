import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAppointment, fetchPets } from "../features/pets/petsActions";
import { toast, ToastContainer } from "react-toastify";
import { fetchUsers } from "../features/users/userSlicer";
import Button from "../components/ui/Button";

function AppointmentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { pets, error, loading } = useSelector((state) => state.pets);
  const { allUsers } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    petId: "",
    date: "",
    reason: "",
    vetId: "",
    location: "",

    notes: "",
  });
  const [formErrors, setFormError] = useState("");
  const petsData = Object.entries(pets).map(([id, pet]) => ({
    id,
    ...pet,
  }));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchPets());
      dispatch(fetchUsers());
    }
  }, [user, dispatch, navigate]);
  // console.log(error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("success", formData);
    e.preventDefault();
    try {
      await dispatch(addAppointment(formData)).unwrap();
      toast.success("Appointment booked!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-800 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Book Appointment
        </h2>

        {error?.appointments && (
          <p className="text-red-500 mb-4">{error.appointments}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pet Selection */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Select Pet
            </label>
            <select
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            >
              <option value="">-- Choose Pet --</option>
              {petsData &&
                petsData.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Vet */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Vet
            </label>
            <select
              name="vetId"
              value={formData.vetId}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            >
              <option value="">-- Choose Vet --</option>
              {allUsers
                .filter((u) => u.role === "vet")
                .map((vet) => (
                  <option key={vet.id} value={vet.id}>
                    {vet.name || vet.email}
                  </option>
                ))}
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-white">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <Button asChild type="submit" disabled={loading.appointments}>
            {loading.appointments ? "Booking..." : "Book Appointment"}
          </Button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default AppointmentForm;
