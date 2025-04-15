import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/icons/berry.svg";
import { t } from "i18next";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the navbar

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background-100 dark:bg-dark-background-100 sm:h-[100vh] w-full sm:w-1/4 flex flex-col sm:items-center py-6 sm:py-12 px-4 sm:px-6">
      {/* Logo Section */}
      <div className="flex justify-between items-center w-full sm:justify-start">
        <div className="flex gap-2 items-center">
          <img src={logo} className="w-12 sm:w-16" alt="Logo" />
          <p className="dark:text-dark-text-primary text-text-primary text-2xl sm:text-4xl font-bold tracking-tighter">
            Grape App
          </p>
        </div>
        {/* Toggle Button for Mobile */}
        <button
          onClick={toggleNavbar}
          className="sm:hidden text-primary dark:text-dark-text-primary text-2xl"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`mt-8 sm:mt-12 flex flex-col sm:items-center gap-6 sm:gap-10 w-full transition-all duration-300 ${
          isOpen ? "block" : "hidden sm:block"
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full sm:w-3/4 h-12 sm:h-16 rounded-md text-center transition flex items-center px-4 sm:px-5 text-lg sm:text-xl font-bold ${
              isActive
                ? "bg-primary text-background-100 dark:text-dark-background-100"
                : "bg-background-100 dark:bg-dark-background-100 text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-background-100 dark:hover:text-dark-background-100"
            }`
          }
        >
          {t("home")}
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `w-full sm:w-3/4 h-12 sm:h-16 rounded-md text-center transition flex items-center px-4 sm:px-5 text-lg sm:text-xl font-bold ${
              isActive
                ? "bg-primary text-background-100 dark:text-dark-background-100"
                : "bg-background-100 dark:bg-dark-background-100 text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-background-100 dark:hover:text-dark-background-100"
            }`
          }
        >
          {t("tasks")}
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `w-full sm:w-3/4 h-12 sm:h-16 rounded-md text-center transition flex items-center px-4 sm:px-5 text-lg sm:text-xl font-bold ${
              isActive
                ? "bg-primary text-background-100 dark:text-dark-background-100"
                : "bg-background-100 dark:bg-dark-background-100 text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-background-100 dark:hover:text-dark-background-100"
            }`
          }
        >
          {t("projects")}
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `w-full sm:w-3/4 h-12 sm:h-16 rounded-md text-center transition flex items-center px-4 sm:px-5 text-lg sm:text-xl font-bold ${
              isActive
                ? "bg-primary text-background-100 dark:text-dark-background-100"
                : "bg-background-100 dark:bg-dark-background-100 text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-background-100 dark:hover:text-dark-background-100"
            }`
          }
        >
          {t("user.title")}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full sm:w-3/4 h-12 sm:h-16 rounded-md text-center transition flex items-center px-4 sm:px-5 text-lg sm:text-xl font-bold ${
              isActive
                ? "bg-primary text-background-100 dark:text-dark-background-100"
                : "bg-background-100 dark:bg-dark-background-100 text-text-primary dark:text-dark-text-primary hover:bg-primary hover:text-background-100 dark:hover:text-dark-background-100"
            }`
          }
        >
          {t("settings")}
        </NavLink>
      </div>
    </nav>
  );
};