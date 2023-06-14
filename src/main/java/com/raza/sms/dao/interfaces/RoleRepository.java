package com.raza.sms.dao.interfaces;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raza.sms.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(String name);
}
