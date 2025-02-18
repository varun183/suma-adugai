package com.sumadugai.service;

import com.sumadugai.model.Cart;
import com.sumadugai.model.CartItem;
import com.sumadugai.model.Food;
import com.sumadugai.model.User;
import com.sumadugai.repository.CartItemRepository;
import com.sumadugai.repository.CartRepository;
import com.sumadugai.repository.FoodRepository;
import com.sumadugai.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class CartServiceImplementation implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private FoodRepository menuItemRepository;

    @Transactional
    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        Optional<Food> menuItem = menuItemRepository.findById(req.getMenuItemId());
        if (menuItem.isEmpty()) {
            throw new Exception("Menu Item not exist with id " + req.getMenuItemId());
        }

        Cart cart = findCartByUserId(user.getId());

        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getFood().equals(menuItem.get())) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                CartItem updatedItem = updateCartItemQuantity(cartItem.getId(), newQuantity);
                //cart.setTotal(calculateCartTotals(cart)); // Update the total
                //cartRepository.save(cart);
                return updatedItem;
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(menuItem.get());
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setCart(cart);

        newCartItem.setTotalPrice(req.getQuantity() * menuItem.get().getPrice());

        CartItem savedItem = cartItemRepository.save(newCartItem);

        cart.getItems().add(savedItem);
        cart.setTotal(calculateCartTotals(cart)); // Update the total
        cartRepository.save(cart);

        return savedItem;
    }

    @Transactional
    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if (cartItem.isEmpty()) {
            throw new Exception("Cart item not exist with id " + cartItemId);
        }
        cartItem.get().setQuantity(quantity);
        cartItem.get().setTotalPrice((cartItem.get().getFood().getPrice() * quantity));
        CartItem updatedItem = cartItemRepository.save(cartItem.get());

        Cart cart = updatedItem.getCart();
        cart.setTotal(calculateCartTotals(cart)); // Update the total
        cartRepository.save(cart);

        return updatedItem;
    }


    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {

        Long total = 0L;
        for (CartItem cartItem : cart.getItems()) {
            total += cartItem.getFood().getPrice() * cartItem.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Optional<Cart> opt = cartRepository.findByCustomer_Id(userId);

        if (opt.isPresent()) {
            Cart cart = opt.get();
            cart.setTotal(calculateCartTotals(cart)); // Calculate and set the total
            return cart; // Save the cart with the updated total
        }
        throw new Exception("Cart not found");
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> cart = cartRepository.findById(id);
        if(cart.isPresent()) {
            return cart.get();
        }
        throw new Exception("Cart not found with the id "+id);
    }


    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart=findCartByUserId(userId);

        // Use repository to delete items instead of clearing list manually
        cartItemRepository.deleteAll(cart.getItems());

        cart.getItems().clear();
        cart.setTotal(0L);
        return cartRepository.save(cart);
    }

    @Transactional
    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = findCartByUserId(user.getId());
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);

        if (cartItemOpt.isPresent()) {
            CartItem cartItem = cartItemOpt.get();
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            // Don't throw an error; just log it
            System.out.println("Cart item already removed with ID: " + cartItemId);
            return cart;  // Return the cart without modifying it
        }

        cart.setTotal(calculateCartTotals(cart));
        return cartRepository.save(cart);
    }




}