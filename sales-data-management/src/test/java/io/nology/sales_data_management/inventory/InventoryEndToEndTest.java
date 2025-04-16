package io.nology.sales_data_management.inventory;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.nology.sales_data_management.inventory.Inventory;
import io.nology.sales_data_management.inventory.InventoryRepository;
import io.nology.sales_data_management.product.Product;
import io.nology.sales_data_management.product.ProductRepository;
import io.restassured.RestAssured;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class InventoryEndToEndTest {

        @LocalServerPort
        private int port;
        
        private ArrayList<Inventory> inventory = new ArrayList<>();

        @Autowired
        private InventoryRepository inventoryRepository;

        @Autowired
        private ProductRepository productRepository;

        @BeforeEach
        public void setUp() {
            RestAssured.port = port;
            inventoryRepository.deleteAll();
            inventory.clear();
        


        Product chicken = productRepository.save(new Product("Chicken" , new BigDecimal("55.00")));
        Product ngohiong = productRepository.save(new Product("Chicken" , new BigDecimal("18.00")));

        Inventory inventory1 = new Inventory();
        inventory1.setProduct(chicken);
        inventory1.setDate(LocalDate.now());
        inventory1.setOpeningStock(100);
        inventory1.setAdditions(5);
        inventory1.setDeliveries(35);
        inventory1.setCookedProducts(10);
        inventory1.setRemainingStock(50);
        inventoryRepository.save(inventory1);
        inventory.add(inventory1);

        Inventory inventory2 = new Inventory();
        inventory2.setProduct(ngohiong);
        inventory2.setDate(LocalDate.now());

        inventory2.setOpeningStock(100);
        inventory2.setAdditions(10);
        inventory2.setDeliveries(20);
        inventory2.setCookedProducts(10);
        inventory2.setRemainingStock(10);
        inventoryRepository.save(inventory2);
        inventory.add(inventory2);

    }

    @Test
    public void getAllInventory_InventoryInDB_ReturnsSuccess(){
        given().
        when()
            .get("/inventory")
        .then()
            .statusCode(HttpStatus.OK.value())
            .body("$", hasSize(2));

    }

    @Test
public void getAllInventory_NoInventoryInDB_ReturnsEmptyArray() {
    inventoryRepository.deleteAll();
    given().when()
        .get("/inventory")
    .then() 
        .statusCode(HttpStatus.OK.value())
        .body("$" , hasSize(0));

 
}

@Test
public void getInventoryByDAte_InventoryNotFound_ReturnsNotFound() {
    // Act & Assert: Request a task that doesn't exist
    given()
        .when()
            .get("/inventory/{date}", "2025-04-15")  //
        .then()
            .statusCode(HttpStatus.NOT_FOUND.value());  // Expect a 404 Not Found response
}
}