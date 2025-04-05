package io.nology.sales_data_management.inventory;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.sales_data_management.product.Product;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody @Valid CreateInventoryDTO createInventoryDTO) {
        Inventory inventory = inventoryService.createInventory(createInventoryDTO);
        return new ResponseEntity<>(inventory, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody @Valid UpdateInventoryDTO updateInventoryDTO) {
        Inventory inventory = inventoryService.updateInventory(id, updateInventoryDTO);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventory = inventoryService.getAllInventory();
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<List<Inventory>> getInventoryByProductId(@PathVariable Long id) {
        List <Inventory> inventoryList = inventoryService.getInventoryByProductId(id);
        return new ResponseEntity<>(inventoryList, HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Inventory>> getInventoryByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Inventory> inventoryList = inventoryService.getInventoryByDate(date);
        return new ResponseEntity<>(inventoryList, HttpStatus.OK);
    }

    @GetMapping("/range")
    public List<Inventory> getInventoryByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return inventoryService.getInventoryByDateRange(start, end);
    }

    @GetMapping("/product/{productId}/date")
    public ResponseEntity<List<Inventory>> getInventoryByProductAndDate(
            @PathVariable Long productId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Inventory> inventoryList = inventoryService.getInventoryByProductAndDate(productId, date);
        return ResponseEntity.ok(inventoryList);
    }
    
    @GetMapping("/product/{productId}/date-range")
    public ResponseEntity<List<Inventory>> getInventoryByProductAndDateRange(
            @PathVariable Long productId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<Inventory> inventoryList = inventoryService.getInventoryByProductAndDateRange(productId, start, end);
        return ResponseEntity.ok(inventoryList);
    }

}
