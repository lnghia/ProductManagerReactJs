export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  active?: boolean;
  email: string;
  createdDate?: string;
  role?: string;
}
