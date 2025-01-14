package com.sumadugai.controller;

import com.sumadugai.model.IngredientsCategory;
import com.sumadugai.model.IngredientsItem;
import com.sumadugai.request.CreateIngredientCategoryRequest;
import com.sumadugai.request.CreateIngredientRequest;
import com.sumadugai.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientService;

    @PostMapping("/category")
    public ResponseEntity<IngredientsCategory> createIngredientCategory(
            @RequestBody CreateIngredientCategoryRequest req) throws Exception{
        IngredientsCategory items=ingredientService.createIngredientsCategory(req.getName());
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<IngredientsItem> createIngredient(
            @RequestBody CreateIngredientRequest req) throws Exception{

        IngredientsItem item=ingredientService.createIngredientsItem(req.getName(),req.getIngredientCategoryId());
        return new ResponseEntity<>(item,HttpStatus.OK);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateStoke(@PathVariable Long id) throws Exception{
        IngredientsItem item=ingredientService.updateStock(id);
        return new ResponseEntity<IngredientsItem>(item,HttpStatus.OK);
    }




}
