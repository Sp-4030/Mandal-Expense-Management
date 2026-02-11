package com.example.demo.Security.Utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret:}")
    private String jwtSecretProp; // optional: can be set in application.properties

    private Key key;

    private final long expiration = 1000 * 60 * 90; // 90 minutes


    @PostConstruct
    public void init() {
        if (jwtSecretProp != null && !jwtSecretProp.isBlank()) {
            // expect a base64-encoded secret in properties
            byte[] keyBytes = Decoders.BASE64.decode(jwtSecretProp);
            this.key = Keys.hmacShaKeyFor(keyBytes);
        } else {
            // fallback: generate a random key (works for single-instance dev only)
            this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = parseClaims(token);
            Date exp = claims.getBody().getExpiration();
            return exp.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
