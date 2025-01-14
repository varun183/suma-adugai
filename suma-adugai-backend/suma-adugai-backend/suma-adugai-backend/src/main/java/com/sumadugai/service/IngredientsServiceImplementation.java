package com.sumadugai.service;

import com.sumadugai.model.IngredientsCategory;
import com.sumadugai.model.IngredientsItem;
import com.sumadugai.repository.IngredientsCategoryRepository;
import com.sumadugai.repository.IngredientsItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IngredientsServiceImplementation implements IngredientsService {

    @Autowired
    private IngredientsCategoryRepository ingredientsCategoryRepo;

    @Autowired
    private IngredientsItemRepository ingredientsItemRepository;




    @Override
    public IngredientsCategory createIngredientsCategory(
            String name) throws Exception {

       //NEED TO CHECK IF IT EXISTS BEFORE


        IngredientsCategory ingredientCategory=new IngredientsCategory();
        ingredientCategory.setName(name);

        IngredientsCategory createdCategory = ingredientsCategoryRepo.save(ingredientCategory);

        return createdCategory;
    }

    @Override
    public IngredientsCategory findIngredientsCategoryById(Long id) throws Exception {
        Optional<IngredientsCategory> opt=ingredientsCategoryRepo.findById(id);
        if(opt.isEmpty()){
            throw new Exception("ingredient category not found");
        }
        return opt.get();
    }




    @Override
    public IngredientsItem createIngredientsItem(String ingredientName, Long ingredientCategoryId) throws Exception {

        IngredientsCategory category = findIngredientsCategoryById(ingredientCategoryId);

       //NEED TO CHECK IF ITEM EXISTS


        IngredientsItem item=new IngredientsItem();
        item.setName(ingredientName);
        item.setCategory(category);

        IngredientsItem savedIngredients = ingredientsItemRepository.save(item);
        category.getIngredients().add(savedIngredients);

        return savedIngredients;
    }


    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> item=ingredientsItemRepository.findById(id);
        if(item.isEmpty()) {
            throw new Exception("ingredient not found with id "+item);
        }
        IngredientsItem ingredient=item.get();
        ingredient.setInStock(!ingredient.isInStock());
        return ingredientsItemRepository.save(ingredient);
    }





}