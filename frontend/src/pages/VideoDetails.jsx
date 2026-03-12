import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WatchlistContext } from "../contexts/WatchlistContextInstance";
import { HistoryContext } from "../contexts/HistoryContextInstance";
import Layout from "../components/Layout";
import { videoService } from "../api/api";

const VideoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useContext(WatchlistContext);
  const { addToHistory } = useContext(HistoryContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await videoService.getVideoById(id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching video details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      addToHistory(movie);
    }
  }, [movie]);

  if (loading) return <Layout><div className="text-white text-center py-20">Chargement...</div></Layout>;

  if (!movie) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-white">
          <h1 className="text-2xl font-bold text-red-600">Contenu introuvable</h1>
          <button onClick={() => navigate('/')} className="mt-4 underline">Retour à l'accueil</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="mb-6 text-red-600 font-bold hover:underline">
          ← RETOUR
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
<iframe 
  className="w-full h-full" 
  src={movie.trailerUrl} 
  title={movie.title} 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen 
/>            </div>
            <div className="mt-6">
              <h1 className="text-4xl font-black mb-2">{movie.title}</h1>
              <p className="text-gray-400 text-lg mb-4">{movie.description}</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 h-fit">
            <div className="space-y-3 text-sm mb-6">
              <p><span className="text-gray-500">Note:</span> ⭐ {movie.rating}</p>
              <p><span className="text-gray-500">Catégorie:</span> {movie.category}</p>
              <p><span className="text-gray-500">Année:</span> {movie.releaseYear}</p>
            </div>

            {isInWatchlist(movie.id) ? (
              <button onClick={() => removeFromWatchlist(movie.id)} className="w-full py-3 bg-zinc-800 hover:bg-red-900/20 text-red-600 rounded-lg font-bold transition">
                Retirer de ma liste
              </button>
            ) : (
              <button onClick={() => addToWatchlist(movie)} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition">
                Ajouter à ma liste
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetails;