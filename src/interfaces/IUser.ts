export interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  salt: string;
}
export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
