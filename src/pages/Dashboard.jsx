import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPets,
  fetchActivities,
  fetchAppointments,
} from "../features/pets/petsActions";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/ui/Button";
import {
  PawPrint,
  Activity,
  BookOpen,
  Apple,
  Stethoscope,
  Users,
  CalendarDays,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function truncate(text, limit = 100) {
  if (!text || typeof text !== "string") return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pets, activities, appointments, loading, error } = useSelector(
    (state) => state.pets
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchPets())
        .unwrap()
        .catch((err) => toast.error(`Error fetching pets: ${err}`));
      dispatch(fetchActivities())
        .unwrap()
        .catch((err) => toast.error(`Error fetching activities: ${err}`));
      dispatch(fetchAppointments())
        .unwrap()
        .catch((err) => toast.error(`Error fetching appointments: ${err}`));
    }
  }, [dispatch, user]);

  const getPetName = (id) =>
    Array.isArray(pets)
      ? pets.find((p) => p.id === id)?.name || "Unknown Pet"
      : "Unknown Pet";

  const quickLinks = [
    { label: "Add Pet", to: "/add-pets", icon: PawPrint },
    { label: "Health Journal", to: "/health-journal", icon: BookOpen },
    { label: "Activities", to: "/activities", icon: Activity },
    { label: "Nutrition", to: "/nutrition", icon: Apple },
    { label: "Vets", to: "/vets", icon: Stethoscope },
    { label: "Community", to: "/forums", icon: Users },
  ];

  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark-bg py-20 px-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-dark-text mb-8 border-b-2 border-primary pb-2 text-center">
        Welcome, {user?.displayName || "User"}!
      </h1>

      {/* Quick Actions */}
      <section className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              aria-label={`Navigate to ${label}`}
            >
              <Icon className="w-6 h-6 text-primary" />
              <span className="text-gray-700 dark:text-dark-text font-medium">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pets */}
      <section className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
          Your Pets
        </h2>
        {loading.pets ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            Loading...
          </p>
        ) : error.pets ? (
          <p
            className="text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2"
            role="alert"
          >
            {error.pets}
            <button
              onClick={() => dispatch(fetchPets()).unwrap()}
              className="ml-2 text-primary hover:underline"
              aria-label="Retry fetching pets"
            >
              Retry
            </button>
          </p>
        ) : !Array.isArray(pets) || pets.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            No pets found.{" "}
            <Link
              to="/add-pets"
              className="text-primary hover:underline"
              aria-label="Add a pet"
            >
              Add a pet
            </Link>{" "}
            to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white dark:bg-dark-bg p-6 rounded-2xl shadow-md border border-gray-300 dark:border-dark-border"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2">
                  {pet.name}
                </h3>
                <p className="text-gray-600 dark:text-dark-text">
                  <b>Breed:</b> {pet.breed || "Unknown"}
                </p>
                <p className="text-gray-600 dark:text-dark-text">
                  <b>Age:</b> {pet.age || 0} years
                </p>
                <p className="text-gray-600 dark:text-dark-text">
                  <b>Weight:</b> {pet.weight || 0} kg
                </p>
                <p className="text-gray-600 dark:text-dark-text mt-1">
                  <b>Medical History:</b> {truncate(pet.medicalHistory || "")}
                </p>
                <Button asChild className="mt-2">
                  <Link
                    to={`/pets/pets-details/${pet.id}`}
                    aria-label={`View details for ${pet.name}`}
                  >
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Activities */}
      <section className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
          Recent Activities
        </h2>
        {loading.activities ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            Loading...
          </p>
        ) : error.activities ? (
          <p
            className="text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2"
            role="alert"
          >
            {error.activities}
            <button
              onClick={() => dispatch(fetchActivities()).unwrap()}
              className="ml-2 text-primary hover:underline"
              aria-label="Retry fetching activities"
            >
              Retry
            </button>
          </p>
        ) : !Array.isArray(activities) || activities.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            No activities found.{" "}
            <Link
              to="/activities"
              className="text-primary hover:underline"
              aria-label="Add an activity"
            >
              Add an activity
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="flex gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md"
              >
                <Activity className="w-6 h-6 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-gray-700 dark:text-dark-text">
                    <b>{getPetName(act.petId)}</b> -{" "}
                    <span className="capitalize">{act.type || "Unknown"}</span>{" "}
                    on {formatDate(act.createdAt)}
                  </p>
                  {act.notes && (
                    <p className="text-sm text-gray-600 dark:text-dark-text mt-1">
                      {truncate(act.notes, 50)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Vet Appointments */}
      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
          Upcoming Vet Appointments
        </h2>
        {loading.appointments ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            Loading...
          </p>
        ) : error.appointments ? (
          <p
            className="text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2"
            role="alert"
          >
            {error.appointments}
            <button
              onClick={() => dispatch(fetchAppointments()).unwrap()}
              className="ml-2 text-primary hover:underline"
              aria-label="Retry fetching appointments"
            >
              Retry
            </button>
          </p>
        ) : !Array.isArray(appointments) || appointments.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-dark-text">
            Schedule your next vet visit.{" "}
            <Link
              to="/pets/appointments/form"
              className="text-primary hover:underline"
              aria-label="Add an appointment"
            >
              Add an appointment
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-4">
            {appointments
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 5)
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md"
                >
                  <CalendarDays
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-gray-700 dark:text-dark-text">
                      <b>{getPetName(appointment.petId)}</b> - Vet Visit on{" "}
                      {formatDate(appointment.date)} with{" "}
                      {appointment.vetName || "Unknown Vet"}
                    </p>
                    {appointment.reason && (
                      <p className="text-sm text-gray-600 dark:text-dark-text mt-1">
                        {truncate(appointment.reason, 50)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
