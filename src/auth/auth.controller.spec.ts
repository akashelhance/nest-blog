import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockResponse = {
    redirect: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  const mockRequest = {
    user: {
      id: 1,
      googleId: 'google-id-123',
      name: 'John Doe',
      email: 'john@example.com',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('googleAuth', () => {
    it('should redirect to Google for authentication', async () => {
      const result = await controller.googleAuth();
    
      expect(result).toBeUndefined();
    });
  });

  describe('googleAuthCallback', () => {
    it('should generate token and redirect to frontend after successful Google login', async () => {
      const token = 'mock-jwt-token';
      mockAuthService.login.mockResolvedValue(token);  

 
      await controller.googleAuthCallback(mockRequest, mockResponse);

    
      expect(mockAuthService.login).toHaveBeenCalledWith(mockRequest.user);
      expect(mockResponse.redirect).toHaveBeenCalledWith('http://localhost:4200/login?token=mock-jwt-token');
    });

    it('should return an error if no user is found in the Google callback', async () => {
      
      const req = { user: null };

      await controller.googleAuthCallback(req, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Internal Server Error',
        error: 'User not found in Google callback',
      });
    });
  });

  describe('signOut', () => {
    it('should redirect to the sign-out success page', async () => {
      await controller.signOut(mockRequest, mockResponse);

      expect(mockResponse.redirect).toHaveBeenCalledWith('http://localhost:4200/signout-success');
    });

    it('should return error during sign-out if something goes wrong', async () => {
    
      mockResponse.redirect.mockImplementationOnce(() => {
        throw new Error('Signout Error');
      });

      await controller.signOut(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Error during signout',
        error: 'Signout Error',
      });
    });
  });
});
