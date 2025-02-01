package com.sumadugai.service;

import com.sumadugai.Exception.CartException;
import com.sumadugai.Exception.OrderException;
import com.sumadugai.Exception.UserException;
import com.sumadugai.model.Order;
import com.sumadugai.model.User;
import com.sumadugai.request.CreateOrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(CreateOrderRequest order, User user) throws Exception, UserException, CartException;

    public Order updateOrder(Long orderId, String orderStatus) throws OrderException;

    public void cancelOrder(Long orderId) throws OrderException;

    public List<Order> getUserOrders(Long userId) throws OrderException;



}
