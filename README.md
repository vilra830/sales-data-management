# sales-data-management

- An application that allows users to create products and tracks daily inventory, sales of those products

## MVP

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

#### Product Endpoints

- GET / api/products - Get all products
- GET /api/products/{id} - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/{id} - Update Product
- DELETE /api/products/{id} - Delete Product

#### Inventory Endpoints

    - GET   / api/inventory - Get all inventory
    - GET   /api/inventory /{date} - Get inventory by date
    - GET    /api/inventory /product/{productId} - Get inventory by product
    - POST /api/inventory  - Create new inventory Entry
    - PUT /api/inventory  /{id} - Update inventory entry

#### REPORT

    - GET /api/reports/daily/{date}  - Get daily sales report
    - GET /api/reports/product/{productId} - Get product Sales report
    - GET /api/reports/range?start={startDate}&end={endDate}

### Tech Stack

    - Spring Boot
    - Java
    - React with Typescript
    - Axios
    - Redux

### Different Business Logics

#### Creating a Product

    - Product must be unique - throws an error when duplication is detected.

#### Deleting a Product

    - Product can not be deleted when it has an existing inventory.

#### Creating an Inventory

    - Can not create a inventory with the same product and date
    - Opening stock is calculated by the remaining stock of the latest 	  inventory before the date
    - Can not create an inventory if sum of cooked products and remaining stock exceeds the total available stock or either cooked or remaining stocks exceeds the total available stock.
    - Total Stock is the total number of deliveries and additions
    - Total Sales is sold products multiplied by product price

### Bugs and Challenges

    - Need to handle the date for an entry of a skipped date
    - Model Mapper when creating the inventory
    	I had some errors using the model mapper for creating the inventory so I switched to manually setting the data
    - Updating and Deleting the inventory
    - Aware of the ripple effect it can cause on other inventories of the product
    - Updating the Product
    	Needs to be validated for duplication , amount should be valid - how about the inventory?

### Testing

    - Postman and Browser
    	For manual testing
    	So I can get quick responses while building my program.
    	Trigger some error messages like posting duplicates
    - E2E Testing
    	Preliminary testing to check whether data exists or is empty or how does the program behave when fetching non-existent records.

### Future Plans

    - Summarize Total Sales of Products per day
    - Add charts to show how inventory and sales have changed over time, so Ican easily track product performance.
    - Implement Update Inventory
    - Add more Testing in the E2E and unit testing
    - Deploy backend to EC2 instance
    - Deploy frontend to something like Netlify as per the suggestion of my coach
    - Add user administration and authentication
    - Implement Product Update
    - Decide on whether to delete an inventory or not
    - CI/CD
