package com.sumadugai.service;


import com.sumadugai.model.User;

import java.util.List;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public List<User> findAllUsers();



    void updatePassword(User user, String newPassword);

    void sendPasswordResetEmail(User user);

}
