import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Check, X } from "lucide-react";
import { fetchAllPets } from "../../features/admin/adminActions";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";

function AdminPets() {
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingPetId, setEditingPetId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const filteredPets = (pets || []).filter((pet) => {
    const matchesSearch = pet.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || pet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    dispatch(fetchAllPets()).then((res) => {
      console.log("Fetched pets:", res.payload);
    });
  }, [dispatch]);

  const startEdit = (pet) => {
    setEditingPetId(pet.id);
    setEditValues({
      name: pet.name,
      status: pet.status,
    });
  };

  const cancelEdit = () => {
    setEditingPetId(null);
    setEditValues({});
  };
  const saveEdit = async (id) => {
    try {
      await dispatch(updatePetData({ id, updates: editValues })).unwrap();
      toast.success("Pet updated successfully");
      setEditingPetId(null);
    } catch (error) {
      toast.error(error || "Failed to update pet");
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white border-b pb-2">
          All Pets
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by pet name..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-zinc-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Breed
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Age
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPets.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                  >
                    No pets found.
                  </td>
                </tr>
              ) : (
                filteredPets.map((pet) => (
                  <tr key={pet.id}>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {editingPetId === pet.id ? (
                        <input
                          type="text"
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white w-full"
                        />
                      ) : (
                        pet.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {editingPetId === pet.id ? (
                        <input
                          type="text"
                          value={editValues.breed}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              breed: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white w-full"
                        />
                      ) : (
                        pet.breed
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {editingPetId === pet.id ? (
                        <input
                          type="text"
                          value={editValues.age}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              age: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border rounded dark:bg-zinc-700 dark:text-white w-full"
                        />
                      ) : (
                        pet.age
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm capitalize text-gray-800 dark:text-white">
                      {editingPetId === pet.id ? (
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
                        pet.status
                      )}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {editingPetId === pet.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(pet.id)}
                            className="px-2 py-1 rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            <Check className="inline-block w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                          >
                            <X className="inline-block w-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(pet)}
                          className="text-blue-600 cursor-pointer hover:bg-green-500 hover:text-white px-2 py-1 rounded"
                        >
                          <Pencil className="inline-block w-4" />
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

export default AdminPets;
