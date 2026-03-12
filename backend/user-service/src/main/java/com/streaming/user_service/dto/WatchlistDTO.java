package com.streaming.user_service.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WatchlistDTO {
    private Long id;
    private Long videoId;
    private String videoTitle;
    private LocalDateTime addedAt;
}
