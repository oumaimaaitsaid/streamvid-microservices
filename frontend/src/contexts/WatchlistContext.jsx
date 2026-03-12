import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { WatchlistContext } from "./WatchlistContextInstance";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useLocalStorage("watchlist", []);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((item) => item.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};