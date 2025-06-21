package com.food_rescue.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all endpoints
//                        .allowedOrigins("*")// Allow your frontend app
                        .allowedOrigins("http://localhost:8091", "https://meeting.devanasoft.com.np/ng/**","https://meeting.devanasoft.com.np") // Allow your frontend app
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .exposedHeaders("Authorization")
                        .allowCredentials(true); // Allow cookies if needed
            }
        };
    }
}
