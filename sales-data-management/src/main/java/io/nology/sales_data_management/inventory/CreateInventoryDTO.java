package io.nology.sales_data_management.inventory;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class CreateInventoryDTO {
    @NotNull(message = "Product is required")
    private Long productId;  // Reference to Product ID

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Additions is required")
    private Integer additions;

    @NotNull(message = "Deliveries is required")
    private Integer deliveries;

    @NotNull(message = "Cooked products is required")
    private Integer cookedProducts;

    @NotNull(message = "Remaining products is required")
    private Integer remainingStock;

    public Long getProductId() {
        return productId;
    }

    public Integer getRemainingStock() {
        return remainingStock;
    }

    public void setRemainingStock(Integer remainingStock) {
        this.remainingStock = remainingStock;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getAdditions() {
        return additions;
    }

    public void setAdditions(Integer additions) {
        this.additions = additions;
    }

    public Integer getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(Integer deliveries) {
        this.deliveries = deliveries;
    }

    public Integer getCookedProducts() {
        return cookedProducts;
    }

    public void setCookedProducts(Integer cookedProducts) {
        this.cookedProducts = cookedProducts;
    }

}
