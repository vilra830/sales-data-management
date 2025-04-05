package io.nology.sales_data_management.product;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.sales_data_management.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {

        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product with ID "+ id  +" is not found"));
    }

    public Product createProduct(CreateProductDTO newProduct) {
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
        productRepository.deleteById(id);
      
    }

}
