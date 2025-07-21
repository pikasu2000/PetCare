import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, editAdminUser } from "../../features/admin/adminActions";
import Sidebar from "../../components/sidebar";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

function AdminAllUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      dispatch(fetchUsers());
    }
  }, [user, navigate, dispatch]);

  const userData = Object.entries(users || {}).map(([id, user]) => ({
    id,
    ...user,
  }));

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setEditValues({ name: user.name, role: user.role, status: user.status });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditValues({ role: "", status: "" });
  };

  const saveEdit = (id) => {
    if (!editValues.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!editValues.role || !editValues.status) {
      toast.error("Role and Status are required");
      return;
    }
    dispatch(editAdminUser({ id, updates: editValues }))
      .unwrap()
      .then(() => {
        toast.success("User updated successfully");
        setEditingUserId(null);
        dispatch(fetchUsers());
      })
      .catch((err) => {
        toast.error("Failed to update user");
        console.error("Update error:", err);
      });
  };

  const filteredUsers = userData.filter((u) => {
    const searchMatch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const roleMatch = roleFilter === "all" || u.role === roleFilter;
    const statusMatch = statusFilter === "all" || u.status === statusFilter;

    return searchMatch && roleMatch && statusMatch;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white border-b pb-2">
          All Users
        </h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full md:w-1/3 px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="vet">Vet</option>
          </select>
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
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Role
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                  >
                    No matching users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {editingUserId === user.id ? (
                        <input
                          type="text"
                          value={editValues.name || ""}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="px-2 py-1 rounded border dark:bg-zinc-700 dark:text-white w-full"
                        />
                      ) : (
                        user.name
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                      {user.email}
                    </td>

                    <td className="px-4 py-3 text-sm capitalize text-gray-800 dark:text-white">
                      {editingUserId === user.id ? (
                        <select
                          value={editValues.role}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          className="px-2  border-1 py-1 rounded dark:bg-zinc-700 dark:text-white"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="vet">Vet</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm capitalize text-gray-800 dark:text-white">
                      {editingUserId === user.id ? (
                        <select
                          value={editValues.status}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="px-2 py-1 border-1 rounded dark:bg-zinc-700 dark:text-white"
                        >
                          <option value="active">Active</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      ) : user.status === "active" ? (
                        "Active"
                      ) : (
                        "Disabled"
                      )}
                    </td>

                    <td className="px-4 py-3 space-x-2">
                      {editingUserId === user.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(user.id)}
                            className={`px-2 py-1 rounded text-white  bg-green-600 hover:bg-green-700`}
                          >
                            <Check className="inline-block" />
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                          >
                            <X className="inline-block" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(user)}
                            className="text-blue-600 cursor-pointer hover:bg-green-500 hover:text-white px-2 py-1 rounded"
                          >
                            <Pencil className="inline-block" />
                          </button>
                        </>
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

export default AdminAllUser;
