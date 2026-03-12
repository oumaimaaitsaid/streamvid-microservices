package com.streaming.user_service.repositories;

import com.streaming.user_service.entities.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {
    List<WatchHistory> findByUserId(Long userId);
}
