package com.sumadugai.service;

import com.sumadugai.model.Order;
import com.sumadugai.response.PaymentResponse;

public interface PaymentService {

    public PaymentResponse generatePaymentLink(Order order) throws Exception;

}
