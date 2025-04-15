import { Link } from "react-router"
import logo from "../assets/icons/berry.svg"
import { NavLink } from "react-router"
import { t } from "i18next"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg container bg-background-100 dark:bg-dark-background-100 h-[100vh] w-1/4 flex flex-col items-center py-12 px-6">
      <div className="flex gap-2 items-end ">
        <img src={logo} className="w-16"/>
        <p className="dark:text-dark-text-primary text-text-primary text-4xl  font-bold tracking-tighter ">Grape App</p>
      </div>
     
      <div className="mt-12 flex flex-col items-center gap-10 w-full ">
      <NavLink
          to="/"
          className={({ isActive }) =>
            `w-3/4 h-16 rounded-md text-center transition flex items-center px-5 text-xl font-bold ${
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
            `w-3/4 h-16 rounded-md text-center transition flex items-center px-5 text-xl font-bold ${
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
            `w-3/4 h-16 rounded-md text-center transition flex items-center px-5 text-xl font-bold ${
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
          `w-3/4 h-16 rounded-md text-center transition flex items-center px-5 text-xl font-bold ${
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
          `w-3/4 h-16 rounded-md text-center transition flex items-center px-5 text-xl font-bold ${
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
      )

}
