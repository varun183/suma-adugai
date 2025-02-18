package com.sumadugai.controller;

import java.util.List;

import com.sumadugai.Exception.OrderException;
import com.sumadugai.model.Order;
import com.sumadugai.model.User;
import com.sumadugai.service.OrderService;
import com.sumadugai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order")
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader(value = "Authorization", required = false) String jwt,@RequestParam(required = false) String order_status) throws Exception {
        if (jwt != null && !jwt.isEmpty()) {
            User user = userService.findUserProfileByJwt(jwt);
        }

        List<Order> orders = orderService.getAllOrders(order_status);

        return new ResponseEntity<>(orders, HttpStatus.OK);

    }


    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) throws OrderException {
        if(orderId!=null) {
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order deleted with id)"+orderId);
        }else return new ResponseEntity<String>(HttpStatus.BAD_REQUEST) ;
    }




    @PutMapping("/orders/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrders(@RequestHeader(value = "Authorization", required = false) String jwt,@PathVariable Long orderId,@PathVariable String orderStatus) throws Exception {

        if (jwt != null && !jwt.isEmpty()) {
            User user = userService.findUserProfileByJwt(jwt);
        }

        Order orders = orderService.updateOrder(orderId, orderStatus);
        return ResponseEntity.ok(orders);

    }

}
