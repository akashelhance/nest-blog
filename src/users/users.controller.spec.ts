import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  // Mock UsersService
  const mockUsersService = {
    create: jest.fn(),
    findByGoogleId: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', googleId: 'google-id-123', profilePicture: 'profile.jpg' };
      const createdUser = { ...createUserDto, id: 1 };

      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await usersController.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findByGoogleId', () => {
    it('should return user if found by Google ID', async () => {
      const googleId = 'google-id-123';
      const user = { id: 1, googleId, name: 'John Doe', email: 'john@example.com' };

      mockUsersService.findByGoogleId.mockResolvedValue(user);

      const result = await usersController.findByGoogleId(googleId);

      expect(result).toEqual(user);
      expect(mockUsersService.findByGoogleId).toHaveBeenCalledWith(googleId);
    });

    it('should return a message if user not found by Google ID', async () => {
      const googleId = 'google-id-123';

      mockUsersService.findByGoogleId.mockResolvedValue(null);

      const result = await usersController.findByGoogleId(googleId);

      expect(result).toEqual({ message: `User with Google ID ${googleId} not found` });
      expect(mockUsersService.findByGoogleId).toHaveBeenCalledWith(googleId);
    });
  });

  describe('findByEmail', () => {
    it('should return user if found by email', async () => {
      const email = 'john@example.com';
      const user = { id: 1, email, name: 'John Doe', googleId: 'google-id-123' };

      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await usersController.findByEmail(email);

      expect(result).toEqual(user);
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return a message if user not found by email', async () => {
      const email = 'john@example.com';

      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await usersController.findByEmail(email);

      expect(result).toEqual({ message: `User with email ${email} not found` });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});
