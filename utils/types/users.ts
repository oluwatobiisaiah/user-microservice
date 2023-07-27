interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
export interface UserInput extends Pick<UserAttributes, 'firstName'|'lastName'|'email'|'password'|'userType'> {}
export interface UserOuput extends UserAttributes {}
export interface UserUpdateInput extends Partial<UserInput> {}

export interface UserTokenPayload{
    userType: string;
    sub:{
        id: number;
    }
}