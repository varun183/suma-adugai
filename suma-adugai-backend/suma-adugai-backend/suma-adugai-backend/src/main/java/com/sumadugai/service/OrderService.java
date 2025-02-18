package com.sumadugai.service;

import com.sumadugai.Exception.CartException;
import com.sumadugai.Exception.OrderException;
import com.sumadugai.Exception.UserException;
import com.sumadugai.model.Order;
import com.sumadugai.model.User;
import com.sumadugai.request.CreateOrderRequest;
import com.sumadugai.response.PaymentResponse;

import java.util.List;

public interface OrderService {

    public PaymentResponse createOrder(CreateOrderRequest order, User user) throws Exception, UserException, CartException;

    public List<Order> getAllOrders(String order_status);

    public Order updateOrder(Long orderId, String orderStatus) throws OrderException;

    public void cancelOrder(Long orderId) throws OrderException;

    public List<Order> getUserOrders(Long userId) throws OrderException;



}
