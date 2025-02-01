package com.sumadugai.repository;

import com.sumadugai.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("SELECT o FROM Order o WHERE o.customer.id = :userId")
    List<Order> findAllOrdersByUserId(@Param("userId")Long userId);


}
