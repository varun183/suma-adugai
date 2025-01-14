package com.sumadugai.repository;

import com.sumadugai.model.IngredientsCategory;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IngredientsCategoryRepository
        extends JpaRepository<IngredientsCategory, Long> {


    //	List<IngredientCategory> findByFoodId(Long menuItemId);


}
