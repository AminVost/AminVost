"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "aminvost-theme";

function resolveTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  useEffect(() => {
    document.documentElement.dataset.theme = resolveTheme();
  }, []);

  const toggle = () => {
    const current = document.documentElement.dataset.theme;
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <>
      <button
        className="icon-button"
        type="button"
        onClick={toggle}
        aria-label="Toggle color theme"
        title="Toggle theme"
      >
        <span className="theme-toggle-sun" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.42 1.42M16.94 16.94l1.42 1.42M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <span className="theme-toggle-moon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 8.2 8.2 0 1 0 20.5 14.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <style>{`
        .theme-toggle-sun { display: none; align-items: center; justify-content: center; }
        .theme-toggle-moon { display: inline-flex; align-items: center; justify-content: center; }
        html[data-theme="dark"] .theme-toggle-sun { display: inline-flex; }
        html[data-theme="dark"] .theme-toggle-moon { display: none; }
      `}</style>
    </>
  );
}
