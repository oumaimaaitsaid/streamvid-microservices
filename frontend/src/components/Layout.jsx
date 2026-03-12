import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ThemeContext } from "../contexts/ThemeContext";

const Layout = ({ children, hideHeader = false }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Header */}
      {!hideHeader && (
        <header className="flex justify-between items-center px-6 md:px-12 py-4 bg-white dark:bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 transition-colors">
          <h1 
            className="text-red-600 text-3xl font-extrabold tracking-tighter cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/")}
          >
           NightStream
          </h1>

          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-zinc-300">
              <button onClick={() => navigate("/watchlist")} className="hover:text-red-500 transition">Ma Liste</button>
              <button onClick={() => navigate("/profile")} className="hover:text-red-500 transition">Profil</button>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-300 dark:border-zinc-700">
              {/* Theme Toggler f l'Header */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              <span className="hidden sm:inline text-xs text-gray-500 dark:text-zinc-400 font-medium">
                {user?.username}
              </span>
              
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-1.5 rounded-sm text-xs font-bold text-white hover:bg-red-700 transition uppercase tracking-wider"
              >
                Quitter
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-8 bg-gray-50 dark:bg-[#141414] text-black dark:text-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black text-gray-400 dark:text-zinc-500 text-[10px] py-6 px-6 md:px-12 border-t border-gray-200 dark:border-white/10 text-center uppercase tracking-widest">
        &copy; {new Date().getFullYear()}NightStream. BY OUMAIMA
      </footer>
    </div>
  );
};

export default Layout;