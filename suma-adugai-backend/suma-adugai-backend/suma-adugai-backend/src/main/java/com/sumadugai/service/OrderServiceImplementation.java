package com.sumadugai.service;

import com.sumadugai.Exception.CartException;
import com.sumadugai.Exception.OrderException;
import com.sumadugai.Exception.UserException;
import com.sumadugai.model.*;
import com.sumadugai.repository.AddressRepository;
import com.sumadugai.repository.OrderItemRepository;
import com.sumadugai.repository.OrderRepository;
import com.sumadugai.repository.UserRepository;
import com.sumadugai.request.CreateOrderRequest;
import com.sumadugai.response.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService {

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PaymentService paymentService;




    @Override
    public PaymentResponse createOrder(CreateOrderRequest order,User user) throws Exception {

        Address shippAddress = order.getDeliveryAddress();
        // Check if the address already exists in the database
        Optional<Address> existingAddress = addressRepository.findById(shippAddress.getId());
        Address savedAddress;

        // Use the existing address
        // Save the new address
        savedAddress = existingAddress.orElseGet(() -> addressRepository.save(shippAddress));

        // Ensure the address is associated with the user
        if (!user.getAddresses().contains(savedAddress)) {
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }



        Order createdOrder = new Order();

        createdOrder.setCustomer(user);
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());

            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getFood().getPrice()* cartItem.getQuantity());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        Long totalPrice = cartService.calculateCartTotals(cart);

        createdOrder.setTotalAmount(totalPrice);

        createdOrder.setItems(orderItems);
        Order savedOrder = orderRepository.save(createdOrder);



        PaymentResponse res=paymentService.generatePaymentLink(savedOrder);
        return res;

    }


    @Override
    public void cancelOrder(Long orderId) throws OrderException {
        Order order =findOrderById(orderId);
        if(order==null) {
            throw new OrderException("Order not found with the id "+orderId);
        }

        orderRepository.deleteById(orderId);

    }

    @Override
    public List<Order> getAllOrders(String order_status) {



        if(order_status!=null) {
            return orderRepository.findOrderByOrderStatus(order_status);
        }


        return orderRepository.findAll();
    }

    public Order findOrderById(Long orderId) throws OrderException {
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()) return order.get();

        throw new OrderException("Order not found with the id "+orderId);
    }

    @Override
    public List<Order> getUserOrders(Long userId) throws OrderException {
        return orderRepository.findAllOrdersByUserId(userId);
    }


//    private List<MenuItem> filterByVegetarian(List<MenuItem> menuItems, boolean isVegetarian) {
//    return menuItems.stream()
//            .filter(menuItem -> menuItem.isVegetarian() == isVegetarian)
//            .collect(Collectors.toList());
//}



    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
        Order order=findOrderById(orderId);

        System.out.println("--------- "+orderStatus);

        if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        else throw new OrderException("Please Select A Valid Order Status");


    }

}
