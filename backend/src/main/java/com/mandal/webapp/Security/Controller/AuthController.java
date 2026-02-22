package com.mandal.webapp.Security.Controller;

import com.mandal.webapp.Security.Model.User;
import com.mandal.webapp.Security.Model.UserRepository;
import com.mandal.webapp.Security.Utility.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("register/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll()
                .stream()
                .skip(1)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }





    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }


    @DeleteMapping("register/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        User firstUser = userRepository.findFirstByOrderByIdAsc();

        if (firstUser.getId().equals(id)) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "खजानीश cannot be deleted"));
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok(
                Map.of("message", "User deleted successfully")
        );
    }







}
