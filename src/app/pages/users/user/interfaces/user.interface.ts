export interface UserResponse {
  find(arg0: (u: any) => boolean): unknown;
  users: User[];
}

export interface User {
  id: number;
  fullname: string;
  username: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'  
}