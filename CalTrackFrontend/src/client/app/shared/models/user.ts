export interface User {
  id?: number;
  email: String;
  password?: String;
  password_confirmation?: String;
  admin?: boolean;
  target_calories?: number;
}
