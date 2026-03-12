import React, { useState, useMemo } from "react";
import { MOVIES } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  // States: Filtres + Recherche + Tri
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const categories = useMemo(() => [...new Set(MOVIES.map((m) => m.category))], []);

  const filteredAndSortedMovies = useMemo(() => {
  return MOVIES.filter((movie) => {
    const matchesType = typeFilter === "" || movie.type.toUpperCase() === typeFilter.toUpperCase();
    const matchesCategory = categoryFilter === "" || movie.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    
    return matchesType && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "recent") return b.releaseYear - a.releaseYear;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });
}, [typeFilter, categoryFilter, search, sortBy]);

  return (
    <Layout>
    <div className="w-full">
      {/* Title Section */}
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
        <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
        Découvrir
      </h2>

      {/* Barre de Filtres - Modified for Light/Dark mode compatibility */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-600 transition-all"
          >
            <option value="">Tous les types</option>
            <option value="Film">Film</option>
            <option value="Série">Série</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-600 transition-all"
          >
            <option value="">Tous les Genres</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-red-50 dark:bg-zinc-900 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-500 text-sm p-2.5 rounded-lg outline-none font-medium"
          >
            <option value="recent">Plus récents</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un titre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white p-2.5 pl-10 rounded-full outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
        </div>
      </div>

      {/* Grid Section */}
      {filteredAndSortedMovies.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-zinc-500 italic font-medium">
          Aucun résultat trouvé pour votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {filteredAndSortedMovies.map((movie) => (
            <div 
              key={movie.id} 
              onClick={() => navigate(`/video/${movie.id}`)} 
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                <img 
                  src={movie.thumbnailUrl} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={movie.title}
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-[11px] font-bold text-yellow-500 border border-yellow-500/20">
                  ★ {movie.rating}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded">
                    Voir détails
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-bold truncate text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1 font-medium">
                {movie.releaseYear} • {movie.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Home;