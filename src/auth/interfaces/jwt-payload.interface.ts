// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
    sub: number;   // The user ID from the JWT token
    email: string; // User email
  }
  