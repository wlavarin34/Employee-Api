export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string | null;
  department: string | null;
  manager_id: string | null;
}

export interface CreateEmployeeDTO {
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  department?: string;
  manager_id?: string;
}

export interface EmployeeQueryParams {
  search?: string;
  department?: string;
  role?: string;
  page?: number;
  limit?: number;
}
