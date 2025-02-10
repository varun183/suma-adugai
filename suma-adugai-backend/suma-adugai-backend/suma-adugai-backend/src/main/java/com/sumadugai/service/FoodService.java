package com.sumadugai.service;

import com.sumadugai.model.Category;
import com.sumadugai.model.Food;
import com.sumadugai.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

     Food createFood(CreateFoodRequest req, Category category) throws Exception;

    void deleteFood(Long foodId) throws Exception;

     List<Food> searchFood(String keyword);

    public List<Food> getFoodByCategoryNameAndFilters(String categoryName, Boolean isVegetarian,
                                                      Boolean isNonveg,
                                                      Boolean isSeasonal);

    public List<Food> getAllFoodsByCategory(String categoryName);

     Food findFoodById(Long foodId) throws Exception;

     Food updateAvailibilityStatus(Long foodId) throws Exception;

    public Food updateNonVegStatus(Long id) throws Exception;

    public Food updateFoodImage(Long id, List<String> newImages) throws Exception;


    public List<Food> getAllFoods();

}
