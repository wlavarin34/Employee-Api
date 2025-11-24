import { query } from '../../config/db';
import { CreateEmployeeDTO, Employee, EmployeeQueryParams } from './employees.model';

export class EmployeeRepository {
  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const result = await query(
      `
      INSERT INTO employees (first_name, last_name, email, role, department, manager_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.role ?? null,
        data.department ?? null,
        data.manager_id ?? null
      ]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Employee | null> {
    const result = await query('SELECT * FROM employees WHERE id = $1;', [id]);
    return result.rows[0] ?? null;
  }

  async search(params: EmployeeQueryParams): Promise<{ data: Employee[]; total: number }> {
    const { search, department, role, page = 1, limit = 10 } = params;

    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (search) {
      conditions.push(
        `(first_name ILIKE $${idx} OR last_name ILIKE $${idx} OR email ILIKE $${idx})`
      );
      values.push(`%${search}%`);
      idx++;
    }

    if (department) {
      conditions.push(`department = $${idx}`);
      values.push(department);
      idx++;
    }

    if (role) {
      conditions.push(`role = $${idx}`);
      values.push(role);
      idx++;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const offset = (page - 1) * limit;
    values.push(limit, offset);

    const dataQuery = `
      SELECT * FROM employees
      ${whereClause}
      ORDER BY first_name, last_name
      LIMIT $${idx} OFFSET $${idx + 1};
    `;

    const countQuery = `
      SELECT COUNT(*)::int AS count
      FROM employees
      ${whereClause};
    `;

    const [dataResult, countResult] = await Promise.all([
      query(dataQuery, values),
      query(countQuery, values.slice(0, values.length - 2))
    ]);

    return {
      data: dataResult.rows,
      total: countResult.rows[0]?.count ?? 0
    };
  }
}
