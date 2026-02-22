package com.mandal.webapp.Security.Model;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findFirstByOrderByIdAsc();
}
