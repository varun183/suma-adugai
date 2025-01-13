package com.sumadugai.controller;

import com.sumadugai.model.Food;
import com.sumadugai.model.User;
import com.sumadugai.request.CreateFoodRequest;
import com.sumadugai.service.FoodService;
import com.sumadugai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/food")
public class AdminMenuItemController {

    @Autowired
    private FoodService menuItemService;
    @Autowired
    private UserService userService;


    @PostMapping()
    public ResponseEntity<Food> createItem(
            @RequestBody CreateFoodRequest item,    
            @RequestHeader("Authorization") String jwt)
            throws Exception {
        System.out.println("req-controller ----"+item);
        User user = userService.findUserProfileByJwt(jwt);
//		Category category=categoryService.findCategoryById(item.getCategoryId());
        Food menuItem = menuItemService.createFood(item,item.getCategory());
        return ResponseEntity.ok(menuItem);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
            throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        menuItemService.deleteFood(id);
        return ResponseEntity.ok("Menu item deleted");


    }



    @GetMapping("/search")
    public ResponseEntity<List<Food>> getMenuItemByName(@RequestParam String name)  {
        List<Food> menuItem = menuItemService.searchFood(name);
        return ResponseEntity.ok(menuItem);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Food> updateAvilibilityStatus(
            @PathVariable Long id) throws Exception {
        Food menuItems= menuItemService.updateAvailibilityStatus(id);
        return ResponseEntity.ok(menuItems);
    }



}
