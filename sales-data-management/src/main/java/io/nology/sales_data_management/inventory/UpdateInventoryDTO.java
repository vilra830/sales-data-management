package io.nology.sales_data_management.inventory;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class UpdateInventoryDTO {
    @NotNull(message = "ID is required")
    private Long id;  // ID of the inventory being updated

    @NotNull(message = "Product is required")
    private Long productId;  // Reference to Product ID

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Opening stock is required")
    @Positive(message = "Opening stock must be greater than zero")
    private Integer openingStock;

    @NotNull(message = "Additions is required")
    @Positive(message = "Additions must be greater than zero")
    private Integer additions;

    @NotNull(message = "Deliveries is required")
    @Positive(message = "Deliveries must be greater than zero")
    private Integer deliveries;

    @NotNull(message = "Cooked products is required")
    @Positive(message = "Cooked products must be greater than zero")
    private Integer cookedProducts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
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

    public Integer getOpeningStock() {
        return openingStock;
    }

    public void setOpeningStock(Integer openingStock) {
        this.openingStock = openingStock;
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
