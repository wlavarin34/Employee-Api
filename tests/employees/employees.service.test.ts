import { EmployeeService } from '../../src/modules/employees/employees.serivce';
import { EmployeeRepository } from '../../src/modules/employees/employees.repo';
import { redisClient } from '../../src/config/redis';

jest.mock('../../src/modules/employees/employees.repo');
jest.mock('../../src/config/redis', () => {
  const mClient = {
    get: jest.fn(),
    setEx: jest.fn()
  };
  return { redisClient: mClient };
});

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repo: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    repo = new (EmployeeRepository as jest.Mock<EmployeeRepository>)() as jest.Mocked<
      EmployeeRepository
    >;
    service = new EmployeeService(repo);
    jest.clearAllMocks();
  });

  it('returns employee from cache if present', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(
      JSON.stringify({ id: '123', first_name: 'Test', last_name: 'User', email: 't@e.com' })
    );

    const result = await service.getEmployee('123');

    expect(redisClient.get).toHaveBeenCalledWith('employee:123');
    expect(repo.findById).not.toHaveBeenCalled();
    expect(result.id).toBe('123');
  });

  it('fetches from DB and caches result when not cached', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    repo.findById.mockResolvedValue({
      id: '123',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      role: null,
      department: null,
      manager_id: null
    } as any);

    const result = await service.getEmployee('123');

    expect(redisClient.get).toHaveBeenCalledWith('employee:123');
    expect(repo.findById).toHaveBeenCalledWith('123');
    expect(redisClient.setEx).toHaveBeenCalled();
    expect(result.id).toBe('123');
  });
});
