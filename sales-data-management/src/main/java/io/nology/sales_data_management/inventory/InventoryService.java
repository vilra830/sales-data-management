package io.nology.sales_data_management.inventory;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import io.nology.sales_data_management.common.exceptions.BadRequestException;
import io.nology.sales_data_management.common.exceptions.NotFoundException;
import io.nology.sales_data_management.product.Product;
import io.nology.sales_data_management.product.ProductService;
import jakarta.validation.Valid;

public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;
    
    public Inventory createInventory(CreateInventoryDTO newInventoryData) {
        Inventory existingEntry = inventoryRepository.findByProductAndDate(newInventoryData.getProductId(), newInventoryData.getDate());
        if(existingEntry != null ){
            throw new BadRequestException("Inventory already exists");
        }
        Inventory inventory = modelMapper.map(newInventoryData, Inventory.class);
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, UpdateInventoryDTO updateInventoryDTO) {
        Optional <Inventory> existingEntry = inventoryRepository.findById(id);
        if(existingEntry.isEmpty()){
            throw new NotFoundException("Inventory with ID " + id + " does not exists");
        }
        Inventory inventory = existingEntry.get();
        modelMapper.map(updateInventoryDTO , inventory);
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
       
    }

    public List<Inventory> getInventoryByProductId(Long id) {
        Product product = productService.getProductById(id);
        List<Inventory> inventoryList = inventoryRepository.findByProduct(product);
        if (inventoryList.isEmpty()) {
            throw new NotFoundException("Inventory for this product " + product.getName());
        }
        return inventoryList;
    }

    public List<Inventory> getInventoryByDate(LocalDate date) {
        List <Inventory> inventoryList = inventoryRepository.findByDate(date);
        if (inventoryList.isEmpty()){
            throw new NotFoundException("No inventory on " + date);
        }

        return inventoryList;
    }

    public List<Inventory> getInventoryByDateRange(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) {
            throw new BadRequestException("Start date cannot be after end date");
        }
        
        List<Inventory> inventoryList = inventoryRepository.findByDateBetween(start, end);
        if (inventoryList.isEmpty()) {
            throw new NotFoundException("There is no inventory between " +  start + " and " + end);
        }
        return inventoryList;
    }

    public List<Inventory> getInventoryByProductAndDate(Long productId, LocalDate date) {
        Product product = productService.getProductById(productId);
        List<Inventory> inventoryList = inventoryRepository.findByProductAndDate(product, date);
        if (inventoryList.isEmpty()) {
            throw new NotFoundException("No inventory found for product " + product.getName() + " on " + date);
        }
        return inventoryList;
    }

    public List<Inventory> getInventoryByProductAndDateRange(Long productId, LocalDate start, LocalDate end) {
        if (start.isAfter(end)) {
            throw new BadRequestException("Start date cannot be after end date");
        }
        
        Product product = productService.getProductById(productId);
        List<Inventory> inventoryList = inventoryRepository.findByProductAndDateBetween(product, start, end);
        if (inventoryList.isEmpty()) {
            throw new NotFoundException("No inventory found for product " + product.getName() + " between " + start + " and " + end);
        }
        return inventoryList;
    }

}
