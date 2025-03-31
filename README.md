# sales-data-management

##MVP

### Build the application to track the following: 

	1. Products (items with prices)
	2. Stock quantities ( current stock, additions, and deliveries)
	3. Daily operations ( cooked products and remaining products)
	4. Sales calculations ( Total stocks - cooked and remaining * price per product)

### The application has 2 entities: 
	1. Product entity
		- Id (PK)
		- Name 
		- Price
	2. Inventory 
		○ Id (PK)
		○ productId(FK)
		○ Date
		○ OpeningStock
		○ Additions
		○ Deliveries
		○ totalStock ( calculated - openingStock + additions + deliveries)
		○ Cooked 
		○ Remaining
		○ Sold ( calculated - totalStock - cooked - remaining)
		○ SalesPerStock ( Sold * product.price)

### Endpoints:

### Product Endpoints
	
 	- GET   / api/products - Get all products
	- GET   /api/products/{id} - Get product by ID
	- POST /api/products - Create new product
	- PUT /api/products/{id} - Update Product 
	- DELETE /api/products/{id} - Delete Product

Inventory Endpoints

GET   / api/inventory - Get all inventory 
GET   /api/inventory /{date} - Get inventory by date
GET    /api/inventory /product/{productId} - Get inventory by product
POST /api/inventory  - Create new inventory Entry 
PUT /api/inventory  /{id} - Update inventory entry


REPORT 

GET /api/reports/daily/{date}  - Get daily sales report
GET /api/reports/product/{productId} - Get product Sales report
GET /api/reports/range?start={startDate}&end={endDate}

Tech Stack

Spring Boot 
Java
React with Typescript
Axios
Redux

![image](https://github.com/user-attachments/assets/19f35e9f-7547-4876-a645-6fdf55a1c084)
