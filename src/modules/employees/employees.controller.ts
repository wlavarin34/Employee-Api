import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from './employees.serivce';

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { first_name, last_name, email, role, department, manager_id } = req.body;

      if (!first_name || !last_name || !email) {
        return res
          .status(400)
          .json({ message: 'first_name, last_name and email are required' });
      }

      const employee = await this.service.createEmployee({
        first_name,
        last_name,
        email,
        role,
        department,
        manager_id
      });

      return res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await this.service.getEmployee(req.params.id);
      return res.json(employee);
    } catch (err) {
      next(err);
    }
  };

  listEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, department, role } = req.query;
      const page = parseInt((req.query.page as string) || '1', 10);
      const limit = parseInt((req.query.limit as string) || '10', 10);

      const result = await this.service.listEmployees({
        search: search as string | undefined,
        department: department as string | undefined,
        role: role as string | undefined,
        page,
        limit
      });

      return res.json({
        data: result.data,
        total: result.total,
        page,
        limit
      });
    } catch (err) {
      next(err);
    }
  };
}
