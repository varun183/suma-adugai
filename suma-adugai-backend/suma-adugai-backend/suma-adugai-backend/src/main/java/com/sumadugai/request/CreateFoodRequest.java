package com.sumadugai.request;

import com.sumadugai.model.Category;
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
    private List<String> images;



    private boolean vegetarian;
    private boolean nonveg;




}
