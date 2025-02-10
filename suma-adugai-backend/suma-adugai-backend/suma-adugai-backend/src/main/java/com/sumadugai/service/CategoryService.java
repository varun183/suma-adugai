package com.sumadugai.service;

import com.sumadugai.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory (Long userId,String name,String image) throws Exception;
    public Category findCategoryById(Long id) throws Exception;
    public List<Category> getAllCategories() throws Exception;



}
