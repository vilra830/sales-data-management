package io.nology.sales_data_management.product;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.sales_data_management.common.exceptions.BadRequestException;
import io.nology.sales_data_management.common.exceptions.NotFoundException;
import io.nology.sales_data_management.inventory.Inventory;
import io.nology.sales_data_management.inventory.InventoryRepository;
import jakarta.validation.Valid;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private InventoryRepository inventoryRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+ id  +" is not found"));
    }

    public Product createProduct(CreateProductDTO newProduct) {
        Optional<Product> existing = productRepository.findByName(newProduct.getName());
        if(existing.isPresent()){
            throw new BadRequestException("Product name must be unique");
        }
        Product product = modelMapper.map(newProduct, Product.class );
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, UpdateProductDTO updatedProduct) {
        Optional<Product> result = productRepository.findById(id);
        if(result.isEmpty()){
            throw new NotFoundException("No Product with such ID " + id + " is found");
        }
        Product product = result.get();
        modelMapper.map(updatedProduct, product);
        return productRepository.save(product);
        
    }

    public void deleteProduct(Long id) {
        Optional<Product> result = productRepository.findById(id);
        if(result.isEmpty()){
            throw new NotFoundException("No Product with such ID " + id + " is found");
        }
        Product product = result.get();
        List<Inventory> inventoryList = inventoryRepository.findByProduct(product);
        
        if (!inventoryList.isEmpty()) {
            throw new BadRequestException("Cannot delete product with existing inventory.");
        }
        productRepository.deleteById(id);      
    }

}
