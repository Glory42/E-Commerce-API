# 🛒 E-Commerce API

## 🎯 Objective
This project is a backend API for an online store, providing essential e-commerce functionalities such as product catalog management, shopping cart handling, order processing, and payment integration.

## 🚀 Key Features
- 🏷 **Product Catalog**: Supports product and category management.
- 🛍 **Shopping Cart**: Allows users to add/remove items.
- 📜 **Order History**: Tracks and manages past orders.
- 🔐 **User Authentication**: Implements JWT authentication.
- 💳 **Payment Integration**: Supports Stripe checkout.
- 📦 **Inventory Management**: Validates stock before order completion.

## 🛠 Technologies Used
- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Payment Gateway**: Stripe
- **Security**: bcrypt for password hashing

## ⚙️ Project Setup

### 1️⃣ Initialize the Project
```sh
mkdir ecommerce-api && cd ecommerce-api
npm init -y
npm install express pg dotenv bcrypt jsonwebtoken stripe
```

### 2️⃣ Project Structure
```sh
ecommerce-api/
├── .env
├── .gitignore
├── app.js
├── config/
│   └── db.js         # PostgreSQL connection
├── routes/
│   ├── auth.js       # User registration/login
│   ├── products.js   # Product CRUD
│   ├── cart.js       # Cart management
│   ├── category.js   # Category CRUD
│   └── orders.js     # Order processing
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── categoryController.js
│   └── orderController.js
└── middleware/
    ├── auth.js       # JWT authentication
    └── isAdmin.js    # Admin role check
```

## 🏗 Steps to Build
1️⃣ **Database Setup**: Create tables for `products`, `categories`, `carts`, and `orders`.
2️⃣ **Authentication**: Implement user authentication using JWT.
3️⃣ **Cart Functionality**: Use cookies or JWT to track user carts.
4️⃣ **Payment Integration**: Research and integrate Stripe/PayPal for checkout.
5️⃣ **Inventory Management**: Ensure stock validation before processing orders.
6️⃣ **Order Management**: Store and retrieve order history.

## 📌 API Endpoints
| ⚡ Method | 🔗 Endpoint       | 📝 Description |
|--------|--------------|-------------|
| POST   | /auth/register | 🆕 User registration |
| POST   | /auth/login | 🔑 User login |
| GET    | /products | 🏷 Get all products |
| POST   | /products | ➕ Add new product (Admin) |
| GET    | /cart | 🛒 View cart |
| POST   | /cart/add | ➕ Add item to cart |
| DELETE | /cart/remove | ❌ Remove item from cart |
| POST   | /orders/checkout | 💰 Checkout & process payment |

## 📚 Concepts Learned
- 💳 Payment gateway integration.
- 🛍 Session management (shopping carts).
- 📦 Inventory logic (stock decrement on purchase).
- 🔐 Secure user authentication using JWT.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## 📜 License
This project is licensed under the MIT **[License](LICENSE)**.

