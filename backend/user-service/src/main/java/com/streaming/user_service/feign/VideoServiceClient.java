package com.streaming.user_service.feign;

import lombok.Data;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "videoservice")
public interface VideoServiceClient {
    @GetMapping("/api/videos/{id}")
    VideoDTO getVideoById(@PathVariable("id") Long id);

    @Data
    class VideoDTO {
        private Long id;
        private String title;
        private String description;
    }
}
