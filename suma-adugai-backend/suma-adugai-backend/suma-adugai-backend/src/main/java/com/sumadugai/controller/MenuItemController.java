package com.sumadugai.controller;

import com.sumadugai.model.Category;
import com.sumadugai.model.Food;
import com.sumadugai.model.User;
import com.sumadugai.response.CategoryMenuResponse;
import com.sumadugai.service.CategoryService;
import com.sumadugai.service.FoodService;
import com.sumadugai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/food")
public class MenuItemController {
    @Autowired
    private FoodService menuItemService;

    @Autowired
    UserService userService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFood() {
        List<Food> foods = menuItemService.getAllFoods();

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(
            @RequestParam String name,@RequestHeader(value = "Authorization",required = false)String jwt) throws Exception {

        if (jwt != null && !jwt.isEmpty()) {
            User user = userService.findUserProfileByJwt(jwt);
        }

        List<Food> menuItem = menuItemService.searchFood(name);
        return ResponseEntity.ok(menuItem);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Food>> getFoodByCategory(
            @RequestParam(required = false) String categoryName, // Accepting category name as a parameter
            @RequestParam(required = false) Boolean isVegetarian,
            @RequestParam(required = false) Boolean isNonveg,
            @RequestHeader(value = "Authorization",required = false)String jwt

    ) throws Exception {

        if (jwt != null && !jwt.isEmpty()) {
            User user = userService.findUserProfileByJwt(jwt);
        }

        List<Food> foods = menuItemService.getFoodByCategoryNameAndFilters( categoryName, isVegetarian,
                isNonveg
                );
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/category/all")
    public ResponseEntity<List<Food>> getAllFoodsByCategory(
            @RequestParam String categoryName) throws Exception {



        List<Food> foods = menuItemService.getAllFoodsByCategory(categoryName);

        return ResponseEntity.ok(foods);
    }








}