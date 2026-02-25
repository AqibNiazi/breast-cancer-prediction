import { Activity, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-teal-400" strokeWidth={2.5} />
          </div>
          <span className="text-base text-white font-bold">
            Onco<span className="text-teal-400">Scan</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 text-center">
          For research purposes only — not a substitute for professional medical
          diagnosis.
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-600">
          <Link to="/about" className="hover:text-slate-400 transition-colors">
            About
          </Link>

          <Link
            to="https://github.com/AqibNiazi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-400 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
