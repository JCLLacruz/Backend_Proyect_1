# Online Pokemon Store API

This is a Node.js server built to serve as the backend for an online store selling Pokémon. It provides endpoints for managing products, comments, users, categories, reviews, and orders.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication, and more.
- **bcryptjs**: A library to help hash passwords.
- **jsonwebtoken**: An implementation of JSON Web Tokens.
- **mysql2**: A MySQL client for Node.js.
- **nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes in the directory are detected.

## Installation

1. Clone this repository:
```markdown
   ```bash
   git clone https://github.com/yourusername/online-store-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd online-store-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run Sequelize seeders to create initial data (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Endpoints

### Products

- **GET /products**: Get all products.
- **GET /products/id/:id**: Get a specific product by ID.
- **GET /products/name/:name**: Get a specific product by name.
- **GET /products/price/:price**: Get products by price.
- **GET /products/descprice**: Get products sorted by price in descending order.
- **POST /products**: Create a new product. (Authentication and admin permission required)
- **PUT /products/:id**: Update a product by ID. (Authentication and admin permission required)
- **DELETE /products/id/:id**: Delete a product by ID. (Authentication and admin permission required)

### Reviews

- **GET /reviews**: Get all reviews.
- **POST /reviews**: Add a new review. (Authentication required)
- **PUT /reviews/id/:id**: Update a review by ID. (Authentication required)
- **DELETE /reviews/id/:id**: Delete a review by ID. (Authentication required)

### Users

- **GET /users**: Get all users.
- **GET /users/:id**: Get a specific user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.
- **GET /getoneonline/:id**: Get a user online by ID.
- **POST /signup**: Register a new user.
- **POST /signin**: Authenticate a user and generate a session token.
- **PUT /:id**: Update user information by ID. (Authentication required)
- **DELETE /id/:id**: Delete a user by ID. (Authentication and admin permission required)
- **DELETE /logout**: Log out the currently authenticated user. (Authentication required)

### Orders

- **GET /orders**: Get all orders.
- **POST /orders**: Create a new order. (Authentication required)

### Categories

- **GET /categories**: Get all categories.
- **GET /categories/id/:id**: Get a specific category by ID.
- **GET /categories/name/:category**: Get a specific category by name.
- **POST /categories**: Create a new category. (Authentication and admin permission required)
- **PUT /categories/update/:id**: Update a category by ID. (Authentication and admin permission required)
- **DELETE /categories/id/:id**: Delete a category by ID. (Authentication and admin permission required)

## Automatic Updates

Thanks to Sequelize's relations via intermediate tables, when a new product is created, all related entities are automatically updated.

## User Permissions

- Only admin or superadmin users can edit, delete, or create new products.
- Reviews can be added, updated, or deleted only by authenticated users.
- Orders can be created only by authenticated users.

## Documentation

[Postman documentation](https://documenter.getpostman.com/view/34523030/2sA3JJ93Xn)

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

Now it includes a section instructing how to run Sequelize seeders to create initial data.

```
