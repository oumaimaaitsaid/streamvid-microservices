import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HistoryContext } from "./HistoryContextInstance";

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useLocalStorage("history", []);

  const addToHistory = (movie) => {
    const alreadyWatched = history.find((item) => item.id === movie.id);

    if (!alreadyWatched) {
      setHistory([
        ...history,
        {
          ...movie,
          watchedAt: new Date().toISOString(),
          completed: true,
        },
      ]);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};