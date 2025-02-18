package com.sumadugai.service;

import com.sumadugai.config.JwtProvider;
import com.sumadugai.model.User;
import com.sumadugai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String email =  jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user == null) {
            throw new Exception("User not found");
        }

        return user;
    }

    @Override
    public List<User> findAllUsers() {
        return List.of();
    }



    @Override
    public void updatePassword(User user, String newPassword) {

    }

    @Override
    public void sendPasswordResetEmail(User user) {

    }
}
