package io.nology.sales_data_management.inventory;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.nology.sales_data_management.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "iventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private LocalDate date;

    private Integer openingStock;

    private Integer additions;

    private Integer deliveries;

    private Integer cookedProducts;

    private Integer remainingStock;



    @Transient
    private Integer totalStock;

    @Transient
    private BigDecimal totalSalesPerProduct;

    @Transient
    private BigDecimal totalCookedProducts;

    @Transient
    private BigDecimal totalRemainingStock;

    @Transient
    private Integer sold;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        return cookedProducts != null ? cookedProducts : 0;
    }

    public void setCookedProducts(Integer cookedProducts) {
        this.cookedProducts = cookedProducts;
    }

    public Integer getRemainingStock() {
        return remainingStock != null ? remainingStock : 0;
    }

    public void setRemainingStock(Integer remainingStock) {
        this.remainingStock = remainingStock;
    }


    public BigDecimal getTotalCookedProducts() {
        if(totalCookedProducts == null && product != null ){
            totalCookedProducts = product.getPrice().multiply(new BigDecimal(getCookedProducts()));
        }
        return totalCookedProducts;
    }

    public void setTotalCookedProducts(BigDecimal totalCookedProducts) {
        this.totalCookedProducts = totalCookedProducts;
    }

    public BigDecimal getTotalRemainingStock() {
        if(totalRemainingStock == null && product != null){
            totalRemainingStock = product.getPrice().multiply(new BigDecimal(getRemainingStock()));
        }

        return totalRemainingStock;
    }

    public void setTotalRemainingStock(BigDecimal totalRemainingStock) {
        this.totalRemainingStock = totalRemainingStock;
    }

    //Calculate Total Stock
    public Integer getTotalStock() {
        if(totalStock == null) {
        return totalStock = getOpeningStock() + getAdditions() + getDeliveries();
        }
        return totalStock;
     }

     public void setTotalStock(Integer totalStock) {
        this.totalStock = totalStock;
    }

    public Integer getSold() {
        if(sold == null) {
            sold = getTotalStock() - getCookedProducts() - getRemainingStock();
        }
        return sold;
    }

    public void setSold(Integer sold) {
        this.sold = sold;
    }

      
    public BigDecimal getTotalSalesPerProduct() {
       if(totalSalesPerProduct == null && product != null) {
             totalSalesPerProduct = product.getPrice().multiply(new BigDecimal(getSold()));

       }
       return totalSalesPerProduct;
    }

    public void setTotalSalesPerProduct(BigDecimal totalSalesPerProduct) {
        this.totalSalesPerProduct = totalSalesPerProduct;
    }

        








}
