package com.sumadugai.service;

import com.sumadugai.model.Category;
import com.sumadugai.model.Food;
import com.sumadugai.repository.FoodRepository;
import com.sumadugai.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FoodServiceImplementation implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest  req,
                           Category category
    )
    {

        Food food=new Food();
        food.setFoodCategory(category);
        food.setCreationDate(new Date());
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setVegetarian(req.isVegetarian());
        food.setNonVeg(req.isNonveg());

        food = foodRepository.save(food);

        return food;

    }


    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food=findFoodById(foodId);
//		foodRepository.save(food);
        foodRepository.delete(food);

    }

    @Override
    public List<Food> getFoodByCategoryNameAndFilters(String categoryName, Boolean isVegetarian,
                                                      Boolean isNonveg
                                                     )  {

        List<Food> foods;

        if (categoryName != null && !categoryName.isEmpty() && !categoryName.equalsIgnoreCase("all")) {
            foods = foodRepository.findFoodsByFoodCategory_Name(categoryName);
        } else {
            foods = foodRepository.findAll();
        }

// Apply filters only if at least one is true
        if (Boolean.TRUE.equals(isVegetarian) || Boolean.TRUE.equals(isNonveg) ) {
            if (Boolean.TRUE.equals(isVegetarian)) {
                foods = filterByVegetarian(foods, true);
            }
            if (Boolean.TRUE.equals(isNonveg)) {
                foods = filterByNonveg(foods, true);
            }

        }

        return foods; // Remove redundant category fetching
    }





    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream()
                .filter(food -> food.isVegetarian() == isVegetarian)
                .collect(Collectors.toList());
    }

    private List<Food> filterByNonveg(List<Food> foods, boolean isNonveg) {
        return foods.stream()
                .filter(food -> food.isNonVeg()==isNonveg)
                .collect(Collectors.toList());
    }


    @Override
    public List<Food> getAllFoodsByCategory(String categoryName) {
        // Add null check for categoryName
        if (categoryName == null || categoryName.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }

        // Use repository method with database-level filtering
        return foodRepository.findFoodsByFoodCategory_Name(categoryName);
    }



    @Override
    public List<Food> searchFood(String keyword) {
        List<Food> items=new ArrayList<>();

        if(!Objects.equals(keyword, "")) {
            System.out.println("keyword -- "+keyword);
            items=foodRepository.searchByNameOrCategory(keyword);
        }

        return items;
    }

    @Override
    public Food updateAvailibilityStatus(Long id) throws Exception {
        Food food = findFoodById(id);

        food.setAvailable(!food.isAvailable());
        foodRepository.save(food);
        return food;
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> food = foodRepository.findById(foodId);
        if (food.isPresent()) {
            return food.get();
        }
        throw new Exception("food with id" + foodId + "not found");
    }

    @Override
    public Food updateNonVegStatus(Long id) throws Exception {
        Food food = findFoodById(id);
        if (food == null) {
            throw new Exception("Food item with ID " + id + " not found");
        }
        food.setNonVeg(true);
        return foodRepository.save(food);
    }

    @Override
    public Food updateFoodImage(Long id, List<String> newImages) throws Exception {
        Food food = findFoodById(id); // Find the food item
        food.setImages(newImages); // Update the images list
        return foodRepository.save(food); // Save and return updated food
    }





    @Override
    public List<Food> getAllFoods(){
        return foodRepository.findAll();
    }





}