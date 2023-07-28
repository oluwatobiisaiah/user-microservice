import { StatusCodes } from "http-status-codes";
import { createCustomError } from "../../errors/customError";
import { Users } from "../../models/users.model";
import { UserInput, UserOuput } from "../../utils/types/users";

export const create = async (payload: UserInput): Promise<UserOuput> => {
  const user = await Users.create(payload);
  return user.dataValues;
};

export const getOneById = async (id: number): Promise<UserOuput> => {
  const user = await Users.findOne({ where: { id } });
  if (user) {
    return user.dataValues;
  } 
  throw createCustomError("User not found", StatusCodes.NOT_FOUND);
};

export const getOneByEmail = async (email: string): Promise<UserOuput> => {
  const user = await Users.findOne({ where: { email } });
  if (user) {
    return user.dataValues;
  }
  throw createCustomError("Invalid Credential", StatusCodes.BAD_REQUEST);
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOuput> => {
  const user = await Users.update(payload, { where: { id } }).then(() =>
    Users.findOne({ where: { id } })
  );

  if (user) {
    return user.dataValues;
  }
  throw createCustomError("User not found", StatusCodes.UNAUTHORIZED);
};

export const getAll = async (): Promise<UserOuput[]> => {
  const users = await Users.findAll();
  return users.map((user) => {
    const { password, ...rest } = user.dataValues;
    return rest;
  });
};

export const deleteOne = async (id: number): Promise<any> => {
    const user = await Users.destroy({ where: { id } });

    if (user) {
        return user;
    }
    throw createCustomError("User not found", StatusCodes.NOT_FOUND);
}
