package com.food_rescue.backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dgbvrtcqc");
        config.put("api_key", "318286318244218");
        config.put("api_secret", "0WYMQkCKE_U4VznRW2n9sl4iunU");

        return new Cloudinary(config);
    }
}
