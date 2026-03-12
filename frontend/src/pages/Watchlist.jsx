import React, { useContext } from "react";
import { WatchlistContext } from "../contexts/WatchlistContextInstance";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black mb-8">Ma Liste</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border-2 border-dashed border-zinc-800">
            <p className="text-gray-500">Votre liste est vide.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {watchlist.map(movie => (
              <div key={movie.id} className="group relative">
                <img 
                  src={movie.thumbnailUrl} 
                  className="w-full aspect-[2/3] object-cover rounded-lg cursor-pointer hover:scale-105 transition shadow-lg"
                  onClick={() => navigate(`/video/${movie.id}`)}
                  alt={movie.title}
                />
                <button 
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
                <h3 className="mt-2 text-sm font-bold truncate">{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Watchlist;