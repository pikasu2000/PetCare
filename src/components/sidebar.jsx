import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUser } from "../features/auth/authActions"; // Hypothetical logout action
import { toast } from "react-toastify";
import {
  LogOut,
  Users,
  PawPrint,
  ActivitySquare,
  LayoutDashboard,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Pets", icon: PawPrint, path: "/admin/pets" },
  { name: "Appointments", icon: Calendar, path: "/admin/appointments" },
  { name: "Activities", icon: ActivitySquare, path: "/admin/activities" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(`Logout failed: ${err.message || "Something went wrong"}`);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          "max-h-screen w-64 bg-white dark:bg-dark-bg shadow-md flex flex-col fixed lg:static z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 font-bold text-2xl text-primary dark:text-dark-text border-b border-gray-300 dark:border-dark-border">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-dark-text hover:bg-primary/10 dark:hover:bg-primary/20 transition",
                location.pathname === path &&
                  "bg-primary/20 font-semibold text-primary"
              )}
              aria-label={`Navigate to ${name}`}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile click
            >
              <Icon className="w-5 h-5 text-primary" />
              {name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-300 dark:border-dark-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 transition"
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
