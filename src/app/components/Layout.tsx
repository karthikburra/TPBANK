import { Outlet, NavLink } from "react-router";
import { useEffect, useState } from "react";
import {
  Home,
  FileText,
  CreditCard,
  UserCircle,
  Sun,
  Moon,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/bills", icon: FileText, label: "Bills" },
  { to: "/cards", icon: CreditCard, label: "Cards" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

export function Layout() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("tp-theme");
    const initial: "dark" | "light" =
      stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    window.localStorage.setItem("tp-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col">
      {/* Global theme toggle – visible on all screens */}
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium rim-light bg-bg-surface/90 text-text-secondary border border-border backdrop-blur"
        aria-label="Toggle light/dark mode"
      >
        {theme === "dark" ? (
          <>
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </>
        )}
      </button>
      {/* Page content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Nav – styled closer to Figma BottomNavBar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border z-40">
        <div className="max-w-sm mx-auto flex items-center justify-between px-4 py-2">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 w-16 text-[10px] font-semibold transition-colors ${
                  isActive ? "text-brand-blue-text" : "text-text-secondary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-brand-blue text-bg-base shadow-[0_4px_16px_rgba(79,70,229,0.35)]"
                        : "border border-border bg-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all ${
                        isActive ? "stroke-bg-base" : "stroke-text-secondary"
                      }`}
                    />
                  </div>
                  <span
                    className={`transition-colors ${
                      isActive ? "text-brand-blue-text" : "text-text-secondary"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}