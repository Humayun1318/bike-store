# Bike Shop API

This project provides a RESTful API for managing bike inventory and customer orders. It allows you to create, read, update, and delete bike entries in the system, place orders, and calculate total revenue.

# Features

## Bike Management

- Create a new bike: Add a new bike to the inventory with details like name, price, quantity, and category.
- Retrieve bikes: Get a list of all bikes or search for bikes by name, brand, or category.
- Update a bike: Modify bike details, such as price or quantity.
- Delete a bike: Remove a bike from the inventory.

## Order Management

- Place an order: Customers can order bikes. When an order is placed, the stock is updated accordingly.
- Insufficient stock handling: Orders cannot be placed if stock is insufficient, and appropriate error messages are returned.

## Revenue Calculation

- Calculate total revenue: Calculate the total revenue generated from all orders, based on bike prices and quantities ordered.

# Tech Stack

- Node.js: Backend runtime environment.
- Express: Web framework for building the API.
- TypeScript: Superset of JavaScript that enhances code quality with type safety.
- MongoDB: NoSQL database used for storing bikes and orders.
- Mongoose: ODM (Object Data Modeling) for MongoDB, used for defining schemas and interacting with the database.

# Project Setup

## Prerequisites

Before starting, make sure you have the following installed:

- Node.js (v14.x or above)
- MongoDB (either local or via MongoDB Atlas)
- TypeScript (for compiling TypeScript code)

## Steps to Set Up Locally

1. Clone the repository:

```bash
git clone https://github.com/Humayun1318/bike-store.git
cd bike-store

```

2. Install dependencies: Install required packages for the project:

```bash
npm install

```

3. Set up MongoDB:

- If using local MongoDB, ensure it’s running on the default port (27017).
- If using MongoDB Atlas, create a new cluster and use the provided connection URI.
- Update your connection string in the .env file or directly in the config.ts file.

4. TypeScript Compilation: Compile TypeScript code:

```bash
npx tsc

```

5. Run the application: Start the project:

```bash
npm start

```

The server should now be running on http://localhost:5000.
