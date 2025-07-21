import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../features/auth/authActions";
import Button from "./ui/Button";
import {
  CircleUser,
  ChevronDown,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Dropdown from "./Dropdown";

import logo from "../assets/logo.png";
import clsx from "clsx";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const unauthenticatedLinks = (
    <>
      <Link
        to="/"
        className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
      >
        About
      </Link>
      <Link
        to="/features"
        className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
      >
        Features
      </Link>
      <Link
        to="/contact"
        className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
      >
        Contact
      </Link>
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </>
  );

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const petDropdownItems = [
    { label: "Add Pet", to: "/add-pets", component: Link },
    { label: "View Pets", to: "/view-pets", component: Link },
    { label: "Health Journal", to: "/health-journal", component: Link },
  ];

  const careDropdownItems = [
    { label: "Activities", to: "/pets/activities/from", component: Link },

    { label: "Nutrition", to: "/nutrition", component: Link },
    { label: "Vets", to: "/vets", component: Link },
  ];

  const communityDropdownItems = [
    { label: "Forums", to: "/forums", component: Link },
    { label: "Events", to: "/events", component: Link },
  ];

  const profileDropdownItems = [
    { label: "Dashboard", to: "/dashboard", component: Link },
    { label: "Settings", to: "/settings", component: Link },
    { label: "Profile", to: `/profile/${user?.id}`, component: Link },
    { label: "Logout", to: "#", component: "button", onClick: handleLogout },
  ];

  const SearchBox = (
    <div className="hidden lg:flex items-center w-70 max-w-sm h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 shadow-sm transition-all duration-300">
      <input
        type="text"
        placeholder="Search pets or services"
        className="flex-grow bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 outline-none"
        aria-label="Search pets or services"
      />
      <Search className="w-5 h-5 text-gray-500 dark:text-gray-300 ml-2" />
    </div>
  );

  const authenticatedLinks = (
    <>
      <Link
        to="/"
        className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
      >
        Home
      </Link>

      {user?.role === "admin" && (
        <Link
          to="/admin/dashboard"
          className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
        >
          Admin
        </Link>
      )}

      <Dropdown
        trigger={
          <span
            className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green"
            aria-haspopup="true"
          >
            My Pets <ChevronDown className="ml-1 w-4 h-4" />
          </span>
        }
        items={petDropdownItems}
      />
      <Dropdown
        trigger={
          <span
            className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green"
            aria-haspopup="true"
          >
            Care <ChevronDown className="ml-1 w-4 h-4" />
          </span>
        }
        items={careDropdownItems}
      />
      <Dropdown
        trigger={
          <span
            className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green"
            aria-haspopup="true"
          >
            Community <ChevronDown className="ml-1 w-4 h-4" />
          </span>
        }
        items={communityDropdownItems}
      />
      <Dropdown
        trigger={
          <span
            className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green"
            aria-haspopup="true"
          >
            <CircleUser className="w-5 h-5" />
            {user?.displayName || "User"}
            <ChevronDown className="w-4 h-4" />
          </span>
        }
        items={profileDropdownItems}
      />
    </>
  );

  return (
    <header
      className="sticky w-full top-0 z-50 bg-white dark:bg-zinc-800 shadow-md
     px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center transition-colors duration-300"
    >
      <Link to="/" className="flex items-center" aria-label="Pet Care App Home">
        <img src={logo} alt="Pet Care Logo" className="h-10 w-auto" />
      </Link>
      {SearchBox}
      <nav
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row gap-4 lg:gap-6 items-center text-sm lg:text-base 
         absolute lg:static top-16 left-0 right-0 bg-light dark:bg-dark-bg lg:bg-transparent 
         lg:dark:bg-transparent p-6 lg:p-0 shadow-lg lg:shadow-none transition-all duration-300`}
      >
        {user ? authenticatedLinks : unauthenticatedLinks}
         <div className="relative w-10 h-10">
        <button
          onClick={toggleTheme}
          className={clsx(
            "absolute inset-0 p-2 rounded-md text-gray-700 dark:text-white transition-opacity duration-300",
            darkMode ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={toggleTheme}
          className={clsx(
            "absolute inset-0 p-2 rounded-md text-gray-700 dark:text-white transition-opacity duration-300",
            darkMode ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
      </nav>
      <button
        className="lg:hidden p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-100
         dark:hover:bg-gray-700 focus:outline-none focus:ring-2 "
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
     
    </header>
  );
};

export default Navbar;
