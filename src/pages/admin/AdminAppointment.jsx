import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAppointments,
  fetchAllPets,
} from "../../features/admin/adminActions";
import { Pencil, Check, X } from "lucide-react";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

// import { fetchUsers } from "../../features/users/userSlicer";

function AdminAppointment() {
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.admin);
  const { users } = useSelector((state) => state.users); // assume admin has all users
  const { pets } = useSelector((state) => state.pets); // assume pets slice has all pets

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    dispatch(fetchAllAppointments());
    // dispatch(fetchUsers());
    dispatch(fetchAllPets());
  }, [dispatch]);

  const getPetName = (id) => pets?.find((p) => p.id === id)?.name || "Unknown";
  const getUserName = (id) =>
    users?.find((u) => u.id === id)?.fullName || "Unknown";

  const filtered = (appointments || []).filter((a) => {
    const matchesSearch = a.location
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (a) => {
    setEditingId(a.id);
    setEditValues({
      date: a.date,
      location: a.location,
      status: a.status || "active",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = async (id) => {
    if (!editValues.date || !editValues.location) {
      return toast.error("Date and Location are required");
    }
    try {
      await dispatch(
        updateAppointmentData({ id, updates: editValues })
      ).unwrap();
      toast.success("Appointment updated");
      setEditingId(null);
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Appointments</h1>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by location..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-zinc-700">
              <tr>
                {[
                  "Pet",
                  "User",
                  "Date",
                  "Location",
                  "Reason",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                  >
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 text-sm dark:text-white">
                      {getPetName(a.petId)}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-white">
                      {getUserName(a.userId)}
                    </td>

                    <td className="px-4 py-3 text-sm dark:text-white">
                      {editingId === a.id ? (
                        <input
                          type="date"
                          value={editValues.date}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white"
                        />
                      ) : (
                        a.date
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm dark:text-white">
                      {editingId === a.id ? (
                        <input
                          type="text"
                          value={editValues.location}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white"
                        />
                      ) : (
                        a.location
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm dark:text-white">
                      {a.reason}
                    </td>

                    <td className="px-4 py-3 text-sm dark:text-white capitalize">
                      {editingId === a.id ? (
                        <select
                          value={editValues.status}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white"
                        >
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      ) : (
                        a.status || "active"
                      )}
                    </td>

                    <td className="px-4 py-3 space-x-2">
                      {editingId === a.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(a.id)}
                            className="px-2 py-1 rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-2 py-1 rounded text-white bg-gray-500 hover:bg-gray-600"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(a)}
                          className="px-2 py-1 rounded text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAppointment;
