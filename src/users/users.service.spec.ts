import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  // Mock the UserRepository
  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('findByGoogleId', () => {
    it('should return user if found by Google ID', async () => {
      const googleId = 'google-id-123';
      const user = {
        id: 1,
        googleId,
        name: 'John Doe',
        email: 'john@example.com',
        posts: [],
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findByGoogleId(googleId);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { googleId } });
    });

    it('should return undefined if user not found by Google ID', async () => {
      const googleId = 'google-id-123';
      mockUserRepository.findOne.mockResolvedValue(undefined);

      const result = await service.findByGoogleId(googleId);
      expect(result).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('should return user if found by email', async () => {
      const email = 'john@example.com';
      const user = {
        id: 1,
        googleId: 'google-id-123',
        name: 'John Doe',
        email,
        posts: [],
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    });

    it('should return undefined if user not found by email', async () => {
      const email = 'john@example.com';
      mockUserRepository.findOne.mockResolvedValue(undefined);

      const result = await service.findByEmail(email);
      expect(result).toBeUndefined();
    });
  });

  describe('findOne', () => {
    it('should return user if found by user ID', async () => {
      const userId = 1;
      const user = {
        id: 1,
        googleId: 'google-id-123',
        name: 'John Doe',
        email: 'john@example.com',
        posts: [],
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(userId);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should return null if user not found by user ID', async () => {
      const userId = 1;
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(userId);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        googleId: 'google-id-123',
        profilePicture: 'profile-pic-url',
      };

      const createdUser = {
        id: 1,
        ...createUserDto,
        posts: [],
      };

      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(createdUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
    });
  });
});
