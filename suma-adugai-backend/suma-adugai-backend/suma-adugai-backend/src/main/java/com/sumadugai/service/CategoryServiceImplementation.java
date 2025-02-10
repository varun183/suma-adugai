package com.sumadugai.service;

import com.sumadugai.model.Category;
import com.sumadugai.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImplementation implements CategoryService {



    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Long userId,String name,String image) throws Exception {
        Category createdCategory=new Category();
        createdCategory.setName(name);
        createdCategory.setImage(image);
        return categoryRepository.save(createdCategory);
    }



    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> opt=categoryRepository.findById(id);

        if(opt.isEmpty()) {
            throw new Exception("category not exist with id "+id);
        }

         return opt.get();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

}
