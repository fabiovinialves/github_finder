import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import classes from "./App.module.css";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={classes.app}>
      <div className={classes.topbar}>
        <h1>GitHub Finder</h1>

        <button
          type="button"
          className={classes.themeToggle}
          onClick={toggleTheme}
          aria-label={`Ativar tema ${theme === "dark" ? "claro" : "escuro"}`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default App;