/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { WatchlistProvider } from './contexts/WatchlistContextInstance';
import { HistoryProvider } from "./contexts/HistoryContextInstance";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";

// Lazy pages
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const VideoDetails = React.lazy(() => import("./pages/VideoDetails"));
const Watchlist = React.lazy(() => import("./pages/Watchlist"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Home = React.lazy(() => import("./pages/Home"));

// 1. DARORI: Had l-composant khassu ikoun hna bach t-khdem l-protection
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
};

const ThemeWrapper = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={darkMode ? "dark" : ""}>
      {/* transition-colors bach t-welli l-qlba dyal l-mode d-drif */}
      <div className="min-h-screen bg-white text-black dark:bg-[#141414] dark:text-white transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <AuthProvider>
          <WatchlistProvider>
            <HistoryProvider>
              <Router>
                <Suspense fallback={<div className="h-screen flex items-center justify-center">Chargement...</div>}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Hna kolchi Protected dork */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                   <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/video/:id" element={<ProtectedRoute><VideoDetails /></ProtectedRoute>} />
                  </Routes>
                </Suspense>
              </Router>
            </HistoryProvider>
          </WatchlistProvider>
        </AuthProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;