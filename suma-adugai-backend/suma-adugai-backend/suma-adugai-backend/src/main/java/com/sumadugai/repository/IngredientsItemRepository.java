package com.sumadugai.repository;

import com.sumadugai.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface IngredientsItemRepository extends JpaRepository<IngredientsItem, Long> {



}
