import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
export function DarkModeProvider({ children }) {
  //   const [theme, setTheme] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       return localStorage.getItem("theme") || "dark";
  //     }
  //     return "dark";
  //   });
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      setTheme(storageTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(ThemeContext);
  return context;
}
