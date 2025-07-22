export interface IUser {
  email: string;
  name: string;
  avatar: string;
  gender?: string;
  role: 'user' | 'admin';
  providers: string[];
  isActive?: boolean;
}
