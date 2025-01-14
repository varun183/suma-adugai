package com.sumadugai.service;

import com.sumadugai.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory (String name, Long userId) throws Exception;
    public Category findCategoryById(Long id) throws Exception;



}
