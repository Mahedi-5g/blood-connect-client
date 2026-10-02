"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";

export function ThemeToggle({ className = "", showLabel = false }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle theme"
        className="relative group flex items-center gap-2 p-2 rounded-xl border border-rose-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-red-400/50"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <Sun
            className={`w-5 h-5 text-amber-500 transition-all duration-300 transform ${
              isDark
                ? "-rotate-90 scale-0 opacity-0 absolute"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`w-5 h-5 text-rose-400 dark:text-rose-300 transition-all duration-300 transform ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0 absolute"
            }`}
          />
        </div>

        {showLabel && (
          <span className="text-sm font-medium capitalize">
            {theme === "system" ? "System" : isDark ? "Dark" : "Light"}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 p-1.5 shadow-xl backdrop-blur-lg z-50 animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
              theme === "light"
                ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </div>
            {theme === "light" && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
              theme === "dark"
                ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-rose-400" />
              <span>Dark</span>
            </div>
            {theme === "dark" && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
              theme === "system"
                ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>System</span>
            </div>
            {theme === "system" && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}

export function ThemeToggleSwitch({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-red-400 focus:ring-offset-2 ${
        isDark ? "bg-slate-800" : "bg-rose-100"
      } ${className}`}
    >
      <span
        className={`pointer-events-none flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          isDark ? "translate-x-6 bg-slate-900 text-rose-300" : "translate-x-0.5 text-amber-500"
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </span>
    </button>
  );
}

export default ThemeToggle;
