<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

User Management System API
This is a RESTful API built with NestJS and MongoDB for managing user accounts and authentication. It provides endpoints for creating, reading, updating, and deleting users, as well as handling user authentication, token refresh, and password reset functionality.

## Table of Contents

* Getting Started
  - Prerequisites
  - Cloning the Repository
  - Installing Dependencies
  - Configuration
  - Running the API
* API Functionality
* API Documentation
* License

## Getting Started
Follow these steps to set up and run the API locally.

## Prerequisites
Ensure you have the following installed:

* Node.js (v18 or higher)
* npm (v9 or higher)
* MongoDB (local instance or MongoDB Atlas)
* A Gmail account or other SMTP service for sending password reset emails

## Cloning the Repository
* Clone the repository from GitHub:
git clone https://github.com/GAPV-Coder/test-broers.git
cd test-broers

## Installing Dependencies
* Install the required dependencies using npm:
npm install

## Configuration
Create a .env file in the root directory of the project and add the following environment variables:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gestion-usuarios?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password


* Replace <username> and <password> with your MongoDB Atlas credentials or local MongoDB connection details.
* Use a secure, unique value for JWT_SECRET and JWT_REFRESH_SECRET.
* For EMAIL_USER and EMAIL_PASS, use a Gmail account with an App Password if 2FA is enabled.

## Running the API

1. Start the API in development mode:

npm run start:dev

The API will be available at http://localhost:3000.

2. Seed the database (optional):

To populate the database with sample users, run:
npm run seed

This creates two test users:

* Email: juan.perez@ejemplo.com, Password: contrasena123
* Email: maria.gomez@ejemplo.com, Password: contrasena456

## API Functionality
The User Management System API provides the following features:

* User Management:
  - Create new users with full name, email, and password.
  - Retrieve a list of active users or a specific user by ID.
  - Update user details (full name and email).
  - Soft delete users (mark as inactive).


* Authentication:
  - User login with email and password, returning JWT access and refresh tokens.
  - Refresh access tokens using a refresh token.
  - Request password reset via email.
  - Reset password using a secure token.


* Security:
 - Passwords are hashed using bcrypt.
 - Sensitive fields (e.g., password) are excluded from API responses.
 - Protected endpoints require JWT authentication.



The API uses MongoDB for data storage, NestJS for the backend framework, and Nodemailer for sending emails. It includes input validation with class-validator and error handling for robustness.

## PI Documentation
The API is documented using Swagger (OpenAPI). Once the API is running, access the interactive documentation at:
URL: http://localhost:3000/api
The Swagger UI provides detailed information about each endpoint, including:

  * HTTP methods and paths.
  * Request bodies and parameters.
  * Example responses and error codes.
  * Authentication requirements (JWT for protected endpoints).

To test protected endpoints, use the Authorize button in Swagger to enter a Bearer <accessToken> obtained from the /autenticacion/login endpoint.

## Author
* Gustavo Pereira Villa

## License
This project is licensed under the MIT License.
