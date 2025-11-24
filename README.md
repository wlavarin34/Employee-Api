# Employee API

Employee API is a Node.js and PostgreSQL service for managing employees
and departments.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install
dependencies.

``` bash
npm install
```

## Usage

Start the development server:

``` bash
npm run dev
```

Example API requests:

``` bash
# Get all employees
GET /employees

# Get one employee
GET /employees/:id

# Create an employee
POST /employees
{
  "name": "John Doe",
  "email": "john@example.com",
  "departmentId": 1,
  "role": "Software Engineer"
}

# Update an employee
PATCH /employees/:id

# Delete an employee
DELETE /employees/:id
```

Department routes:

``` bash
# Get all departments
GET /departments

# Create a department
POST /departments
{
  "name": "Engineering"
}

# Get department by ID
GET /departments/:id

# Delete a department
DELETE /departments/:id
```

## Contributing

Pull requests are welcome.\
For major changes, please open an issue first to discuss what you would
like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
