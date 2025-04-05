package io.nology.sales_data_management.inventory;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.nology.sales_data_management.product.Product;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{
    List<Inventory> findByDate(LocalDate date);
    List<Inventory> findByProduct(Product product);
    List<Inventory> findByDateBetween(LocalDate startDate, LocalDate endDate);
    Inventory findByProductAndDate(Long id, LocalDate date);
    List<Inventory> findByProductAndDate(Product product, LocalDate date);
    List<Inventory> findByProductAndDateBetween(Product product, LocalDate start, LocalDate end);
}
