import React, { useState, useEffect } from "react";
import { HistoryContext } from "./HistoryContextInstance";
import { userService } from "../api/api";

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const userId = 1; // Demo User ID

  const fetchHistory = async () => {
    try {
      const response = await userService.getHistory(userId);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const addToHistory = async (movie) => {
    try {
      const alreadyWatched = history.find((item) => item.videoId === movie.id);

      if (!alreadyWatched) {
        await userService.addToHistory(userId, movie.id, movie.duration || 0, true);
        fetchHistory();
      }
    } catch (error) {
      console.error("Error recording history:", error);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};