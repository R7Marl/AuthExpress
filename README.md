
# Login and Registration API with Express.js

This is a simple API for user login and registration built with Express.js and MySQL. It includes user authentication, password hashing, and basic CRUD operations for managing users.

## Features

- **User Registration**: Register a new user with a username, password, and email.
- **User Login**: Authenticate users with their username and password.
- **Password Hashing**: Secure user passwords using hashing.
- **CRUD Operations**: Manage user data with basic Create, Read, Update, and Delete operations.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14.x or later)
- MySQL (v5.7 or later)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and configure your database connection details:

```bash
DB_HOST=your-database-host
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=your-port (default is 3306 for MySQL)
```

### 4. Create the Database Tables

Make sure your MySQL server is running and the database specified in your `.env` file exists. Then, run the following commands to create the necessary tables:

1. Create a file named `create_users_table.sql` in your project with the following content:

```sql
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Run the script:

```bash
node path/to/your/script/that/creates/the/table.js
```

### 5. Run the Application

To start the development server, use:

```bash
npm run dev
```

For a production environment, you can use:

```bash
npm start
```

The server should be running on `http://localhost:3000` by default.

### 6. API Endpoints

- **POST /register**: Register a new user.
  - **Body**: `{ "username": "string", "password": "string", "email": "string" }`
- **POST /login**: Log in a user.
  - **Body**: `{ "username": "string", "password": "string" }`

## Project Structure

```bash
/project-root
|-- /common
|   |-- /database
|       |-- db.js  # Database connection setup
|-- /controllers
|   |-- authController.js  # Authentication logic
|-- /routes
|   |-- authRoutes.js  # Authentication routes
|-- /middlewares
|   |-- authMiddleware.js  # Middleware for authentication
|-- .env  # Environment variables
|-- index.js  # Entry point of the application
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is open source and available under the MIT License.
