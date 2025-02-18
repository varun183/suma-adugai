package com.sumadugai.request;

import lombok.Data;

import java.util.List;

@Data
public class AddCartItemRequest {

    private Long menuItemId;
    private int quantity;

}
