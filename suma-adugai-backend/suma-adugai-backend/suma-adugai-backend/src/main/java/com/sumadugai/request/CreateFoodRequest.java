package com.sumadugai.request;

import com.sumadugai.model.Category;
import com.sumadugai.model.IngredientsItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFoodRequest {



    private String name;
    private String description;
    private Long price;


    private Category category;
    private List<String> image;



    private boolean vegetarian;
    private boolean nonveg;
    private boolean seasonal;


    private List<IngredientsItem> ingredients;


}
