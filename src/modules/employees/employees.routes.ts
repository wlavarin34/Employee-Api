import { Router } from 'express';
import { EmployeeRepository } from './employees.repo';
import { EmployeeService } from './employees.serivce';
import { EmployeeController } from './employees.controller';

const repo = new EmployeeRepository();
const service = new EmployeeService(repo);
const controller = new EmployeeController(service);

export const employeeRouter = Router();

employeeRouter.post('/', controller.createEmployee);
employeeRouter.get('/:id', controller.getEmployeeById);
employeeRouter.get('/', controller.listEmployees);
