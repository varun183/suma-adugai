package com.sumadugai.request;

import lombok.Data;

@Data
public class CreateIngredientRequest {

    private String name;
    private Long CategoryId;
}
