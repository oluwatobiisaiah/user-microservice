import bycrpt from 'bcryptjs'

export const hash = (password:string) => bycrpt.hashSync(password, bycrpt.genSaltSync(10))

export const compare = (password:string, hashedPassword:string) => bycrpt.compareSync(password, hashedPassword)

