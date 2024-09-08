### Fast Food Backend Project Guide

#### 1. **Project Overview**
The **Fast Food Backend** is a Node.js application developed to manage the backend functionalities of a fast food delivery system. The system supports three types of users:
- **Admin**: Has full control over the application, including managing users, businesses, and system configurations.
- **Business (Restaurant Owners)**: Can manage their restaurants, food items, and orders.
- **User (End Customer)**: Can browse food items, place orders, and manage their profiles.

The backend uses **JWT-based authentication** for secure access, with role-based permissions for different types of users. The application is containerized using Docker for portability and easy deployment. Data storage is managed by **MongoDB** for structured document-based data, while **MinIO** is used for storing images and other media files, acting as a private cloud storage solution.

#### 2. **Technologies Used**
- **Node.js & Express.js**: JavaScript runtime and framework used for building the core API functionalities.
- **Docker**: Used for containerizing the MongoDB and MinIO services to ensure easy deployment and scalability.
- **MongoDB**: A NoSQL database used to store data related to users, food items, orders, and restaurants.
- **MinIO**: An object storage solution used for storing images and files, serving as an alternative to AWS S3.
- **JWT (JSON Web Tokens)**: Used for secure authentication of users, ensuring safe communication between the frontend and backend.
- **Mongoose**: An ODM (Object Data Modeling) library used to manage data in MongoDB.
- **Bcrypt**: For hashing and securing passwords.
- **Multer**: Middleware for handling file uploads, such as profile pictures and food images.
- **Express Validator**: A tool for validating and sanitizing incoming requests.
- **Cors**: Middleware to enable cross-origin requests from the frontend.
- **Prettier & ESLint**: Code formatting and linting tools to ensure clean and maintainable code.
- **Postman**: Used for API testing and managing API collections for development.

#### 3. **Minimum System Requirements**
- **Operating System**: Windows 10 or higher, macOS, or Linux.
- **Memory**: At least 4GB of RAM.
- **Disk Space**: At least 2GB of free disk space.
- **Node.js**: Version 20.15.0 or higher.
- **Docker**: Docker Desktop or Docker Engine installed.

#### 4. **Pre-requisite Installations**

1. **Node.js Installation Guide**:
   - You can install Node.js by following the official installation guide for your operating system: [Node.js Installation](https://nodejs.org/en/download/)

2. **Docker Installation Guide**:
   - Install Docker by following the official Docker documentation for your operating system:
     - **For Windows and macOS**: [Install Docker Desktop](https://docs.docker.com/get-started/get-docker/)
     - **For Linux**: [Install Docker Engine](https://docs.docker.com/engine/install/)

#### 5. **Initial Setup**

1. **Clone the Repository**
   ```bash
   git clone git@github.com:Parth-243/fast-food-backend.git
   cd fast-food-backend
   ```

2. **Install Dependencies**
   Install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Copy the Environment File**
   Copy the `.env-sample` file to `.env` to set up the required environment variables:
   ```bash
   cp .env-sample .env
   ```
   Ensure that the `.env` file has correct values for **MongoDB**, **MinIO**, and **JWT**.

4. **Run Docker Containers**
   Use Docker to run the MongoDB and MinIO containers:
   ```bash
   docker-compose up -d
   ```

5. **Run the Application**
   Start the Node.js backend:
   ```bash
   npm run start
   ```

#### 6. **Postman API Collection & Environment Setup**
To simplify API testing, the project includes two files:
- `postman_api_collection.json`: A collection of all the APIs.
- `postman_environment.json`: A Postman environment file containing environment-specific variables like base URL and tokens.

##### **Importing the Postman Collection:**
1. Open **Postman**.
2. Click on the **Import** button.
3. Select the **File** option and locate the `postman_api_collection.json` file in the project root.
4. Click **Open** to import the collection.
5. The collection will now be available in Postman, allowing you to test all the APIs.

##### **Importing the Postman Environment:**
1. Click the **Import** button and locate the `postman_environment.json` file.
2. Once imported, select this environment from the dropdown in the top-right corner of Postman.
3. Now you can use environment variables like `{{uri}}` in your requests to dynamically resolve the correct URL.

##### **Using the Environment in API Requests:**
- Once the environment is set, you can make API requests using environment variables like `{{uri}}`.
- For example, instead of hardcoding the URL for an API request, use `{{uri}}/api/endpoint`.
- This allows for easy switching between different environments (e.g., development, staging) by simply selecting a different Postman environment.

#### 7. **Project Structure Overview**

- **config/index.js**: General configuration setup for the application.
- **docker-compose.yml**: Contains the Docker setup for MongoDB and MinIO services.
- **index.js**: Main entry point for starting the Express.js server.
- **routes.js**: Handles the definition of all the API routes.
- **src**: Contains all the application logic, services, middleware, and data models.
   - **apis**: Divided into three user roles: `admin`, `business`, and `users`, with subdirectories for handling specific features such as authentication, food categories, restaurants, and users.
   - **common/services**: Contains shared services like `authService.js`, `uploadService.js`, and `userService.js`.
   - **common/validator**: Contains validation logic for requests, such as `authValidator.js`.
   - **middleware**: Authentication and file-handling middleware, including JWT authentication for admin, business, and user roles.
   - **models**: MongoDB schemas for entities such as `user`, `food`, `restaurant`, etc.
   - **utils/minioClient.js**: Utility file to set up and interact with MinIO for file storage.

#### 8. **API Authentication**
The system uses **JWT-based authentication** for validating requests. Every API request related to users, restaurants, and food requires the client to pass a valid JWT token. This token is generated at login and needs to be included in the Authorization header of API requests.

#### 9. **License**
This project is licensed under the **GNU General Public License Version 3 (GPL-3.0)**. You are free to use, modify, and distribute the project, provided any modifications also remain open source under the same license.

#### 10. **Running the Project**
Once the Docker application is running:
1. Use `docker-compose up -d` to start MongoDB and MinIO.
2. Run `npm run start` to start the backend.
3. Import the Postman collection and environment, then begin testing the APIs.
