package com.sumadugai.service;

import com.sumadugai.model.Category;
import com.sumadugai.model.Food;
import com.sumadugai.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category) throws Exception;

    void deleteFood(Long foodId) throws Exception;

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailibilityStatus(Long foodId) throws Exception;
}
