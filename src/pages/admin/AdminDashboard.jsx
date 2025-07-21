import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchUsers,
  fetchAllPets,
  fetchAllActivities,
  fetchAllAppointments,
} from "../../features/admin/adminActions";
import { Users, PawPrint, Activity, Calendar } from "lucide-react";
import Sidebar from "../../components/sidebar";

function truncateDescription(text, wordLimit = 100) {
  if (!text || typeof text !== "string") return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, pets, activities, appointments, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (!user || !user.role == "admin") {
      navigate("/dashboard");
      toast.error("Access denied: Admin privileges required");
      return;
    }

    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => {
        toast.error(
          `Error fetching users: ${err.message || "Something went wrong"}`
        );
      });
    dispatch(fetchAllPets())
      .unwrap()
      .catch((err) => {
        toast.error(
          `Error fetching pets: ${err.message || "Something went wrong"}`
        );
      });
    dispatch(fetchAllActivities())
      .unwrap()
      .catch((err) => {
        toast.error(
          `Error fetching activities: ${err.message || "Something went wrong"}`
        );
      });
    dispatch(fetchAllAppointments())
      .unwrap()
      .catch((err) => {
        toast.error(
          `Error fetching appointments: ${
            err.message || "Something went wrong"
          }`
        );
      });
  }, [dispatch, user, navigate]);

  const getPetName = (petId) => {
    if (!Array.isArray(pets)) return "Unknown Pet";
    const pet = pets.find((p) => p.id === petId);
    return pet ? pet.name : "Unknown Pet";
  };

  const getUserName = (userId) => {
    if (!Array.isArray(users)) return "Unknown User";
    const user = users.find((u) => u.id === userId);
    return user ? user.displayName : "Unknown User";
  };

  const SkeletonLoader = ({ count = 3 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-dark-border"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1 animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-light dark:bg-dark-bg flex">
      <Sidebar/>
      <div className="flex-1 py-10 px-4 sm:px-6 lg:pl-5 lg:pr-8">
        <h1 className="text-center font-bold text-3xl sm:text-4xl mb-8 text-gray-800 dark:text-dark-text border-b-2 border-primary pb-2">
          Admin Dashboard
        </h1>

        {/* Metrics Overview */}
        <section className="w-full max-w-4xl mb-12 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
            System Overview
          </h2>
          {loading.users ||
          loading.pets ||
          loading.activities ||
          loading.appointments ? (
            <SkeletonLoader count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" /> Total Users
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {Array.isArray(users) ? users.length : 0}
                </p>
              </div>
              <div className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2 flex items-center gap-2">
                  <PawPrint className="w-6 h-6 text-primary" /> Total Pets
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {Array.isArray(pets) ? pets.length : 0}
                </p>
              </div>
              <div className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-primary" /> Total Activities
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {Array.isArray(activities) ? activities.length : 0}
                </p>
              </div>
              <div className="bg-white dark:bg-dark-bg rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" /> Total
                  Appointments
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {Array.isArray(appointments) ? appointments.length : 0}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="w-full max-w-4xl mb-12 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
              aria-label="Manage users"
            >
              <Users className="w-6 h-6 text-primary" />
              <span className="text-gray-700 dark:text-dark-text font-medium">
                Manage Users
              </span>
            </Link>
            <Link
              to="/admin/pets"
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
              aria-label="Manage pets"
            >
              <PawPrint className="w-6 h-6 text-primary" />
              <span className="text-gray-700 dark:text-dark-text font-medium">
                Manage Pets
              </span>
            </Link>
            <Link
              to="/admin/activities"
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
              aria-label="Manage activities"
            >
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-gray-700 dark:text-dark-text font-medium">
                Manage Activities
              </span>
            </Link>
            <Link
              to="/admin/appointments"
              className="flex items-center gap-3 p-4 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg shadow-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200"
              aria-label="Manage appointments"
            >
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-gray-700 dark:text-dark-text font-medium">
                Manage Appointments
              </span>
            </Link>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="w-full max-w-4xl mb-12 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
            Recent Activities
          </h2>
          {loading.activities ? (
            <SkeletonLoader count={2} />
          ) : error.activities ? (
            <p
              className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2 text-center mb-6"
              role="alert"
            >
              {typeof error.activities === "string"
                ? error.activities
                : error.activities?.message || JSON.stringify(error.activities)}
              <button
                onClick={() => dispatch(fetchAllActivities()).unwrap()}
                className="ml-2 text-primary hover:underline"
                aria-label="Retry fetching activities"
              >
                Retry
              </button>
            </p>
          ) : !Array.isArray(activities) || activities.length === 0 ? (
            <p className="text-gray-600 dark:text-dark-text text-center">
              No activities found.
            </p>
          ) : (
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-dark-bg rounded-lg shadow-md border border-gray-300 dark:border-dark-border transition-all duration-200"
                >
                  <Activity
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-gray-700 dark:text-dark-text">
                      <span className="font-medium">
                        {getPetName(activity.petId)}
                      </span>{" "}
                      by{" "}
                      <span className="font-medium">
                        {getUserName(activity.userId)}
                      </span>{" "}
                      - <span className="capitalize">{activity.type}</span> on{" "}
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                    {activity.notes && (
                      <p className="text-gray-600 dark:text-dark-text text-sm mt-1">
                        {truncateDescription(activity.notes, 50)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {activities.length > 5 && (
                <Link
                  to="/admin/activities"
                  className="text-primary hover:underline text-center block mt-4"
                  aria-label="View all activities"
                >
                  View More
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Recent Appointments */}
        <section className="w-full max-w-4xl mb-12 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
            Recent Appointments
          </h2>
          {loading.appointments ? (
            <SkeletonLoader count={2} />
          ) : error.appointments ? (
            <p
              className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2 text-center mb-6"
              role="alert"
            >
              {error.appointments}
              <button
                onClick={() => dispatch(fetchAllAppointments()).unwrap()}
                className="ml-2 text-primary hover:underline"
                aria-label="Retry fetching appointments"
              >
                Retry
              </button>
            </p>
          ) : !Array.isArray(appointments) || appointments.length === 0 ? (
            <p className="text-gray-600 dark:text-dark-text text-center">
              No appointments found.
            </p>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-dark-bg rounded-lg shadow-md border border-gray-300 dark:border-dark-border transition-all duration-200"
                >
                  <Calendar
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-gray-700 dark:text-dark-text">
                      <span className="font-medium">
                        {getPetName(appointment.petId)}
                      </span>{" "}
                      by{" "}
                      <span className="font-medium">
                        {getUserName(appointment.userId)}
                      </span>{" "}
                      - Vet Visit on{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 dark:text-dark-text text-sm mt-1">
                      {truncateDescription(appointment.reason, 50)}
                    </p>
                  </div>
                </div>
              ))}
              {appointments.length > 5 && (
                <Link
                  to="/admin/appointments"
                  className="text-primary hover:underline text-center block mt-4"
                  aria-label="View all appointments"
                >
                  View More
                </Link>
              )}
            </div>
          )}
        </section>

        {/* User Management */}
        <section className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text mb-4">
            User Management
          </h2>
          {loading.users ? (
            <SkeletonLoader count={2} />
          ) : error.users ? (
            <p
              className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900 rounded-lg px-4 py-2 text-center mb-6"
              role="alert"
            >
              {error.users}
              <button
                onClick={() => dispatch(fetchUsers()).unwrap()}
                className="ml-2 text-primary hover:underline"
                aria-label="Retry fetching users"
              >
                Retry
              </button>
            </p>
          ) : !Array.isArray(users) || users.length === 0 ? (
            <p className="text-gray-600 dark:text-dark-text text-center">
              No users found.
            </p>
          ) : (
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-dark-bg rounded-lg shadow-md border border-gray-300 dark:border-dark-border transition-all duration-200"
                >
                  <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-gray-700 dark:text-dark-text">
                      <span className="font-medium">{user.displayName}</span> (
                      {user.email})
                    </p>
                    <p className="text-gray-600 dark:text-dark-text text-sm mt-1">
                      Status: {user.isActive ? "Active" : "Inactive"}
                    </p>
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-primary hover:underline text-sm"
                      aria-label={`View details for ${user.displayName}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
              {users.length > 5 && (
                <Link
                  to="/admin/users"
                  className="text-primary hover:underline text-center block mt-4"
                  aria-label="View all users"
                >
                  View More
                </Link>
              )}
            </div>
          )}
        </section>

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

export default AdminDashboard;
