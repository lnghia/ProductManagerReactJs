export interface UserCreationDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  password?: string;
  passwordConfirm?: string;
}
