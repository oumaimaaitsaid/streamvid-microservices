/* eslint-disable react-refresh/only-export-components */
import React,{ createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
 const [watchlist, setWatchlist] = useState(() => {
  const saved = localStorage.getItem("watchlist");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}, [watchlist]);

  const addToWatchlist = (video) => {
    if (!watchlist.find(v => v.id === video.id)) {
      setWatchlist([...watchlist, video]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter(v => v.id !== id));
  };

  const isInWatchlist = (id) => watchlist.some(v => v.id === id);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};