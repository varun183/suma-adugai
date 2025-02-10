package com.sumadugai.request;

import com.sumadugai.model.Address;
import lombok.Data;

@Data
public class CreateOrderRequest {



    private Address deliveryAddress;


}