export interface UserCreationDto {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  password?: string;
  passwordConfirm?: string;
}
