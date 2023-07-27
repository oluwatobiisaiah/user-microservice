import { Users } from "../../models/users.model"
import { UserInput, UserOuput } from "../../utils/types/users"

export const create = async (payload: UserInput): Promise<UserOuput> => {
    const user = await Users.create(payload)
    return user.dataValues
}

export const getOneById = async (id: number): Promise<UserOuput>  => {
    const user = await Users.findOne({ where: { id } })
    if(user){
        return user.dataValues
    }
    throw new Error("User not found");
}

export const getOneByEmail = async (email: string): Promise<UserOuput>  => {
    const user = await Users.findOne({ where: { email } })
    if(user){
        return user.dataValues
    }
    throw new Error("User not found");
}