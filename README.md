# 🚀 E-Commerce API

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/github/license/Glory42/E-Commerce-API?style=for-the-badge)

A robust backend REST API for online stores, built with **Express.js** and **TypeScript**. This system leverages **Supabase** for database management and handles secure authentication via JWT, product inventory, shopping carts, and order processing.

> **Note:** Payment integration is currently a work in progress.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [License](#-license)

---

## ✨ Features

- **🔐 Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **🏷️ Product Management**: CRUD operations for managing inventory and product details.
- **🛒 Shopping Cart**: Add, remove, and view items in the user's cart.
- **📦 Order Processing**: Create and manage customer orders.
- **💳 Payment Integration**: *[In Progress]* Integration for handling transactions.
- **🛡️ Middleware Protection**: Role-based access control and input validation.

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT & Supabase Auth

---

## 📂 Folder Structure

```bash
E-Commerce-API/
├── config/         # Database and environment configuration
├── controllers/    # Request handlers for the API routes
├── middlewares/    # Auth and validation middlewares
├── models/         # Data models and schemas
├── routes/         # API route definitions
├── types/          # TypeScript type definitions
├── utils/          # Helper functions and utilities
├── server.ts       # Entry point of the application
└── ...
```

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed 
- [Supabase](https://supabase.com/) project

### Installation

1. **Clone the repository**
```bash
    git clone https://github.com/Glory42/E-Commerce-API.git
    cd E-Commerce-API
```

2. **Install Dependencies**
```bash
    npm install
```

3. **Run the server**
```bash
    # Development mode
    npm run dev

    # Build and start
    npm run build
    npm start
```
## Environment Variables
Create a **.env** file in the root directory and add the following variables:
```
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
```

## API Endpoints 
| Method | Endpoint | Description | 
|-------|------------|-----------|
| `POST` | `/api/auth/register` | Register a new user | 
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/products` | Fetch all products |
| `GET` | `/api/products/:id` | Fetch single product details |
| `POST` | `/api/cart` | Add item to cart |
| `GET` | `/api/cart` | View user cart |
| `POST` | `/api/orders` | Place a new order | 

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for more information.

## Contact

If you have any questions, feel free to reach out to me at `me@gorkemkaryol.dev`.