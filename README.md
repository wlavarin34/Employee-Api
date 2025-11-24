📘 Employee Directory API

A simple and scalable REST API for managing employees, departments, and organizational data.
Built with Node.js, Express/Nest (whichever you're using), and PostgreSQL.

🚀 Features

Create, read, update, and delete employees

Department management

Search and filter employees

PostgreSQL database

Follows REST API best practices

Environment-based configuration

Production-ready project structure

📦 Tech Stack

Node.js

Express or NestJS

PostgreSQL

Prisma / Sequelize / Knex (whichever you used)

TypeScript

📁 Project Structure
employee-directory-api/
│── src/
│   ├── modules/
│   │   ├── employees/
│   │   ├── departments/
│   ├── config/
│   ├── database/
│   ├── main.ts / app.js
│── tests/
│── .env
│── .gitignore
│── package.json
│── README.md

⚙️ Installation
1️⃣ Clone the Repo
git clone https://github.com/YOUR_USERNAME/employee-directory-api.git
cd employee-directory-api

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file:

PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/employees_db
JWT_SECRET=your-secret

🗄️ Database Setup
Create the database:
createdb employees_db


If using Prisma:

npx prisma migrate dev


If using Sequelize:

npx sequelize db:migrate

▶️ Run the Server
Development:
npm run dev

Production:
npm run build
npm start

📚 API Endpoints
👤 Employees
GET /employees

Get all employees

GET /employees/:id

Get a single employee

POST /employees

Create an employee
Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "departmentId": 1,
  "role": "Software Engineer"
}

PATCH /employees/:id

Update employee info

DELETE /employees/:id

Remove an employee

🏢 Departments
GET /departments

Get all departments

POST /departments

Create a department
Body:

{
  "name": "Engineering"
}

GET /departments/:id

Get a department by ID

DELETE /departments/:id

Delete a department

🔍 Search Example
GET /employees?search=john&department=engineering
🧪 Running Tests
npm test

🐳 Docker (Optional)

Build container:

docker build -t employee-api .


Run:

docker run -p 5000:5000 employee-api

📄 License

MIT License

🤝 Contributing

Pull requests are welcome!
