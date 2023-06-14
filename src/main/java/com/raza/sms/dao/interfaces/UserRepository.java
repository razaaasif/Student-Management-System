package com.raza.sms.dao.interfaces;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.raza.sms.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String userName);

	Boolean existsByUsername(String username);
}
