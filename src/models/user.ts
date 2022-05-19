export type User = {
  firstName: string;

  lastName: string;

  email: string;

  role: UserRole;

  verified: boolean;

  createdAt: Date;

  updatedAt: Date;
};

export enum UserRole {
  ANY = "any",
  ADMIN = "admin",
  USER = "user",
}

export type CreateUserDto = {
  firstName?: string;

  lastName?: string;

  email: string;

  password: string;

  role?: UserRole;
};
