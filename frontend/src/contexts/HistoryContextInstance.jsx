/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("watchHistory");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchHistory", JSON.stringify(history));
  }, [history]);

 const addToHistory = (video, progress = 0, completed = false) => {
  setHistory(prev => {
    const existingIndex = prev.findIndex(h => h.video.id === video.id);
    
    if (existingIndex !== -1 && prev[existingIndex].progressTime === progress) {
      return prev; 
    }

    if (existingIndex !== -1) {
      const newHistory = [...prev];
      newHistory[existingIndex] = { ...newHistory[existingIndex], progressTime: progress, completed };
      return newHistory;
    } else {
      return [{ video, watchedAt: new Date().toISOString(), progressTime: progress, completed }, ...prev];
    }
  });
};

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};