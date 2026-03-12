import React, { useState, useEffect } from "react";
import { WatchlistContext } from "./WatchlistContextInstance";
import { userService } from "../api/api";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = 1; // Demo User ID

  const fetchWatchlist = async () => {
    try {
      const response = await userService.getWatchlist(userId);
      setWatchlist(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const addToWatchlist = async (movie) => {
    try {
      if (!watchlist.find((item) => item.videoId === movie.id)) {
        await userService.addToWatchlist(userId, movie.id);
        fetchWatchlist();
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      const entry = watchlist.find(item => item.videoId === id);
      if (entry) {
        await userService.removeFromWatchlist(entry.id);
        fetchWatchlist();
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  const isInWatchlist = (id) => {
    return watchlist.some((item) => item.videoId === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};