import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "~/hooks/useAuth";

export default function Settings() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const {logout} = useAuth()
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    localStorage.theme = newTheme;

  };

  useEffect(() => {
    
    const storedTheme = localStorage.theme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
      <section className="container p-6 sm:p-16">
            <h1 className="text-4xl text-primary font-bold mb-6">{t("settings")}</h1>
            
        <div className="container flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-2xl text-text-secondary dark:text-dark-text-secondary">
            {t("changeLanguage")}
            </p>
            <select 
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-40 p-3 bg-background-100 dark:bg-dark-background-100 text-text-secondary dark:text-dark-text-secondary rounded-md focus:outline-none border-primary dark:border-none border-2">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-2xl text-text-secondary dark:text-dark-text-secondary">
            {t("changeTheme")}
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="w-18 h-8 dark:bg-background-100 bg-primary peer-focus:outline-none ring-2 dark:ring-primary ring-background dark:bg-dark-background-100 rounded-full"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-background dark:bg-primary rounded-full transition-transform peer-checked:translate-x-10"></div>
            </label>
          </div>
          <div className="flex flex-col gap-4">
          <p className="text-2xl text-text-secondary dark:text-dark-text-secondary">
            {t("logout")}
          </p>
          <button
            onClick={logout}
            className="text-lg sm:text-xl font-bold bg-primary sm:bottom-6 sm:right-6 text-background dark:text-dark-background w-12 sm:w-60 rounded-lg sm:px-4 sm:py-2 
            border-3 border-primary hover:bg-background-100 dark:hover:bg-dark-background-100 hover:text-primary"
          >
            {t("logout")}
          </button>
      </div>
      </div>  
          </section>

  );
}
