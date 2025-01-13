package com.sumadugai.controller;

import com.sumadugai.model.Food;
import com.sumadugai.service.FoodService;
import com.sumadugai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class MenuItemController {
    @Autowired
    private FoodService menuItemService;

    @Autowired
    private UserService userService;


    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(
            @RequestParam String name) {
        List<Food> menuItem = menuItemService.searchFood(name);
        return ResponseEntity.ok(menuItem);
    }

}