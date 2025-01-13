package com.sumadugai.service;

import com.sumadugai.model.Category;
import com.sumadugai.model.Food;
import com.sumadugai.repository.FoodRepository;
import com.sumadugai.request.CreateFoodRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImplementation implements FoodService {

    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest  req,
                           Category category
                           )
            throws Exception {

        Food food=new Food();
        food.setFoodCategory(category);
        food.setCreationDate(new Date());
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice((long) req.getPrice());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
        food.setIngredients(req.getIngredients());
        food = foodRepository.save(food);

        return food;

    }


    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food=findFoodById(foodId);
//		foodRepository.save(food);
        foodRepository.delete(food);

    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream()
                .filter(food -> food.isVegetarian() == isVegetarian)
                .collect(Collectors.toList());
    }

    private List<Food> filterByNonveg(List<Food> foods, boolean isNonveg) {
        return foods.stream()
                .filter(food -> !food.isVegetarian())
                .collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream()
                .filter(food -> food.isSeasonal() == isSeasonal)
                .collect(Collectors.toList());
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {

        return foods.stream()
                .filter(food -> {
                    if (food.getFoodCategory() != null) {
                        return food.getFoodCategory().getName().equals(foodCategory);
                    }
                    return false; // Return true if food category is null
                })
                .collect(Collectors.toList());
    }




    @Override
    public List<Food> searchFood(String keyword) {
        List<Food> items=new ArrayList<>();

        if(keyword!="") {
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
}
