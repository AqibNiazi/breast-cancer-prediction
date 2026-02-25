import { useState, useEffect } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/predict", label: "Predict" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
 <header
  className={clsx(
    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
    scrolled ? "glass border-b border-teal-500/10 py-3" : "py-5"
  )}
>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center group-hover:bg-teal-500/25 transition-all duration-200">
            <Activity className="w-4 h-4 text-teal-400" strokeWidth={2.5} />
          </div>
          <span className="font-display font-700 text-lg text-white tracking-tight">
            Onco<span className="text-teal-400">Scan</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-body font-500 transition-all duration-200",
                location.pathname === to
                  ? "text-teal-400 bg-teal-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/predict"
            className="ml-3 btn-primary text-sm py-2 px-5 font-display font-600"
          >
            Run Analysis
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-teal-500/10 px-4 py-4 mt-0 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "w-full px-4 py-3 rounded-xl text-sm font-500 transition-all duration-200",
                location.pathname === to
                  ? "text-teal-400 bg-teal-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800",
              )}
            >
              {label}
            </Link>
          ))}
          <Link to="/predict" className="btn-primary mt-2 text-sm">
            Run Analysis
          </Link>
        </div>
      )}
    </header>
  );
}
