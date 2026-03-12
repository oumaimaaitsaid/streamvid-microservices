import React, { useContext } from "react";
import { HistoryContext } from "../contexts/HistoryContextInstance";
import { WatchlistContext } from "../contexts/WatchlistContextInstance";
import Layout from '../components/Layout';

const Profile = () => {
  const { history } = useContext(HistoryContext);
  const { watchlist } = useContext(WatchlistContext);

  const totalVideosWatched = history.length;
  const totalTimeWatched = history.reduce((acc, h) => acc + (parseInt(h.progressTime) || 0), 0);

  return (
    <Layout>
      {/* 7iyydna l-bg static bach it-t-7ekkem fih l-Layout o l-App */}
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4 dark:border-zinc-800">Mon Profil</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-6 text-red-600">Statistiques de visionnage</h2>
            <div className="space-y-4">
               <div className="flex justify-between">
                  <span className="text-gray-500">Vidéos regardées</span>
                  <span className="font-bold">{totalVideosWatched}</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">Temps total</span>
                  <span className="font-bold">{totalTimeWatched} s</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">Ma Liste</span>
                  <span className="font-bold">{watchlist.length}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;