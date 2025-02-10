package com.sumadugai.controller;

import com.sumadugai.model.Category;
import com.sumadugai.model.User;
import com.sumadugai.service.CategoryService;
import com.sumadugai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    public CategoryService categoryService;

    @Autowired
    public UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(
            @RequestHeader("Authorization")String jwt,
            @RequestBody Category category) throws  Exception {
        User user=userService.findUserProfileByJwt(jwt);

        Category createdCategory=categoryService.createCategory(user.getId(),category.getName(), category.getImage());
        return new ResponseEntity<Category>(createdCategory, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategory(
            @PathVariable Long id,
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Category category=categoryService.findCategoryById(id);
        return new ResponseEntity<>(category,HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories(@RequestHeader(value = "Authorization", required = false)String jwt) throws Exception {
        if (jwt != null && !jwt.isEmpty()) {
            User user = userService.findUserProfileByJwt(jwt);
        }
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }




}
