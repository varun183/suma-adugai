package com.sumadugai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sumadugai.model.User;

public interface UserRepository extends JpaRepository<User,Long> {
	
	public User findByEmail(String username);
	
	

}
