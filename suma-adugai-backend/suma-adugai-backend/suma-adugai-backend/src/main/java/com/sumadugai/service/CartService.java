package com.sumadugai.service;

import com.sumadugai.model.Cart;
import com.sumadugai.model.CartItem;
import com.sumadugai.request.AddCartItemRequest;
import jdk.jshell.spi.ExecutionControl;

public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;




}
