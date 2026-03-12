package com.streaming.user_service.service;

import com.streaming.user_service.entities.*;
import com.streaming.user_service.feign.VideoServiceClient;
import com.streaming.user_service.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final WatchlistRepository watchlistRepository;
    private final WatchHistoryRepository watchHistoryRepository;
    private final VideoServiceClient videoServiceClient;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void addToWatchlist(Long userId, Long videoId) {
        User user = getUserById(userId);
        Watchlist watchlist = Watchlist.builder()
                .user(user)
                .videoId(videoId)
                .addedAt(LocalDateTime.now())
                .build();
        watchlistRepository.save(watchlist);
    }

    public void removeFromWatchlist(Long watchlistId) {
        watchlistRepository.deleteById(watchlistId);
    }

    public List<Watchlist> getWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public void recordHistory(Long userId, Long videoId, Integer progress, Boolean completed) {
        User user = getUserById(userId);
        WatchHistory history = WatchHistory.builder()
                .user(user)
                .videoId(videoId)
                .watchedAt(LocalDateTime.now())
                .progressTime(progress)
                .completed(completed)
                .build();
        watchHistoryRepository.save(history);
    }

    public Map<String, Object> getStatistics(Long userId) {
        List<WatchHistory> history = watchHistoryRepository.findByUserId(userId);
        long totalVideosWatched = history.stream().filter(h -> h.getCompleted()).count();
        int totalTimeSpent = history.stream().mapToInt(h -> h.getProgressTime()).sum();
        
        return Map.of(
                "totalVideosWatched", totalVideosWatched,
                "totalTimeSpentMinutes", totalTimeSpent,
                "historyCount", history.size()
        );
    }
}
