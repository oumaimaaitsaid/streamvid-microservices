package com.streaming.user_service.web;

import com.streaming.user_service.entities.User;
import com.streaming.user_service.entities.Watchlist;
import com.streaming.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/{userId}/watchlist/{videoId}")
    public void addToWatchlist(@PathVariable Long userId, @PathVariable Long videoId) {
        userService.addToWatchlist(userId, videoId);
    }

    @DeleteMapping("/watchlist/{watchlistId}")
    public void removeFromWatchlist(@PathVariable Long watchlistId) {
        userService.removeFromWatchlist(watchlistId);
    }

    @GetMapping("/{userId}/watchlist")
    public List<Watchlist> getWatchlist(@PathVariable Long userId) {
        return userService.getWatchlist(userId);
    }

    @PostMapping("/{userId}/history")
    public void recordHistory(@PathVariable Long userId, 
                              @RequestParam Long videoId, 
                              @RequestParam Integer progress, 
                              @RequestParam Boolean completed) {
        userService.recordHistory(userId, videoId, progress, completed);
    }

    @GetMapping("/{userId}/statistics")
    public Map<String, Object> getStatistics(@PathVariable Long userId) {
        return userService.getStatistics(userId);
    }
}
