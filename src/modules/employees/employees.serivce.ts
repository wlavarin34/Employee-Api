import { EmployeeRepository } from './employees.repo';
import { CreateEmployeeDTO, EmployeeQueryParams, Employee } from './employees.model';
import { redisClient } from '../../config/redis';

const CACHE_TTL_SECONDS = 60;

export class EmployeeService {
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(data: CreateEmployeeDTO): Promise<Employee> {
    const employee = await this.repo.create(data);
    return employee;
  }

  async getEmployee(id: string): Promise<Employee> {
    const cacheKey = `employee:${id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as Employee;
    }

    const employee = await this.repo.findById(id);
    if (!employee) {
      const err: any = new Error('Employee not found');
      err.status = 404;
      throw err;
    }

    await redisClient.setEx(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(employee));
    return employee;
  }

  async listEmployees(params: EmployeeQueryParams) {
    return this.repo.search(params);
  }
}
