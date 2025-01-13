package com.sumadugai.repository;

import com.sumadugai.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {



    @Query("SELECT f FROM Food f WHERE "
            + "f.name LIKE %:keyword% OR "
            + "f.foodCategory.name LIKE %:keyword% "
    )
    List<Food> searchByNameOrCategory(@Param("keyword") String keyword);




}
