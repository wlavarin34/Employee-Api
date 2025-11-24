Employee API

A simple RESTful API for managing employees and departments.
Built with Node.js, TypeScript, and PostgreSQL.

Features

CRUD operations for employees

CRUD operations for departments

Basic filtering and querying

Structured project layout

Ready for interview demos and extensions

Tech Stack

Node.js

Express or NestJS

TypeScript

PostgreSQL

Project Structure
src/
  controllers/
  routes/
  services/
  models/
  config/
tests/
.env
package.json
tsconfig.json
README.md


(Your structure can differ a bit; this is just a reference.)

Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Employee-Api.git
cd Employee-Api

2. Install dependencies
npm install

3. Environment variables

Create a .env file in the root:

PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/employee_db


Update DATABASE_URL to match your local setup.

Database Setup (PostgreSQL)

Create the database:

createdb employee_db


Run your migrations or schema setup (Prisma/Sequelize/Knex/etc.), for example:

# Example (Prisma)
npx prisma migrate dev

Running the API
Development
npm run dev

Production
npm run build
npm start


The API will usually be available at:

http://localhost:5000

API Endpoints
Employees
GET /employees

Return all employees.

GET /employees/:id

Return a single employee by ID.

POST /employees

Create a new employee.

Request body example:

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Software Engineer",
  "departmentId": 1
}

PATCH /employees/:id

Update an employee.

DELETE /employees/:id

Delete an employee.

Departments
GET /departments

Return all departments.

GET /departments/:id

Return a department by ID.

POST /departments

Create a department.

Request body example:

{
  "name": "Engineering"
}

DELETE /departments/:id

Delete a department.

Testing
npm test

License

This project is for educational and interview purposes.
