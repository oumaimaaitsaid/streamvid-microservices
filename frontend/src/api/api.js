import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8222', // Gateway URL
});

export const videoService = {
  getAllVideos: () => api.get('/api/videos'),
  getVideoById: (id) => api.get(`/api/videos/${id}`),
};

export const userService = {
  getWatchlist: (userId) => api.get(`/api/users/${userId}/watchlist`),
  addToWatchlist: (userId, videoId) => api.post(`/api/users/${userId}/watchlist/${videoId}`),
  removeFromWatchlist: (watchlistId) => api.delete(`/api/users/watchlist/${watchlistId}`),
  getHistory: (userId) => api.get(`/api/users/${userId}/history`),
  addToHistory: (userId, videoId, progress, completed) => 
    api.post(`/api/users/${userId}/history`, null, {
      params: { videoId, progress, completed }
    }),
  getStatistics: (userId) => api.get(`/api/users/${userId}/statistics`),
};

export default api;
