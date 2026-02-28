// WebConfig.java
package com.mandal.webapp.Security.SecurityConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // all endpoints
                .allowedOrigins("http://localhost:5173") // your frontend
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS") // preflight methods
                .allowedHeaders("*")
                .allowCredentials(true); // if using JWT in Authorization header
    }
}
