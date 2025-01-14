package com.sumadugai.service;

import com.sumadugai.model.IngredientsCategory;
import com.sumadugai.model.IngredientsItem;

import java.util.List;

public interface IngredientsService {

     IngredientsCategory createIngredientsCategory(
            String name) throws Exception;

     IngredientsCategory findIngredientsCategoryById(Long id) throws Exception;





     IngredientsItem createIngredientsItem(String ingredientName,Long ingredientCategoryId) throws Exception;

     IngredientsItem updateStock(Long id) throws Exception;

}
