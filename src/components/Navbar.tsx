
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100/60 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-extrabold text-slate-800 tracking-tight hover:text-amber-700 transition-colors"
                >
                    <span>Recipe Discovery</span>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-3 sm:gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-amber-100/80 text-amber-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-amber-50/50"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-2xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-amber-100/80 text-amber-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-amber-50/50"
                            }`
                        }
                    >
                        <span>Search</span>
                    </NavLink>
                    
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-2xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-rose-100/80 text-rose-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-rose-50/50"
                            }`
                        }
                    >
                        <span>Favorites</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}