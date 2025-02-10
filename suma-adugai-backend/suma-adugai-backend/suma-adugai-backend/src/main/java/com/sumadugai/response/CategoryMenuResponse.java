package com.sumadugai.response;
import com.sumadugai.model.Food;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryMenuResponse {
    private String categoryName;
    private List<Food> foods;
}
