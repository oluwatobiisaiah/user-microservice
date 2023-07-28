import { UserInput, UserOuput } from "../../utils/types/users";
import { create, getOneByEmail, getOneById } from "./users.dal";
import { hash } from "../../utils/main/encryption";
import { Users } from "../../models/users.model";

describe("Userdal", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("UserDal.__create", () => {
    it("should return created user details", async () => {
      const mockPayload: UserInput = {
        firstName: "first_name",
        lastName: "Last_name",
        email: "myemail@email.com",
        password:
        hash("password"),
        userType: "user",
      };

      const mockResponse = {
        ...mockPayload,
        updatedAt: Date.now(),
        creationAt: Date.now(),
      };

      Users.create = jest.fn().mockResolvedValue(mockResponse);
      // act
      const result = await create(mockPayload);

      // assert
      if(result){
        expect(result).toEqual(mockResponse);
        expect(Users.create).toHaveBeenCalledTimes(1);
        expect(Users.create).toHaveBeenCalledWith(mockPayload);
      }
    
    });
  });

  describe("UserDal.__getOneById", () => {
    it("should return user details", async () => {
      const mockResponse: UserOuput = {
        firstName: "first_name",
        lastName: "Last_name",
        email: "myemail@email.com",
        id: 1,
        userType: "user",
        password: hash("password"),
      };
      const userId = 1;
      Users.findOne = jest.fn().mockResolvedValue(mockResponse);

      // act
      const result = await getOneById(userId);

      if (result) {
        // assert
        expect(result).toEqual(mockResponse);
        expect(Users.findOne).toHaveBeenCalledTimes(1);
        expect(Users.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      }
    });
  });

  describe("UserDal.__getOneByEmail", () => {
    it("should return user details", async () => {
      const mockResponse: UserOuput = {
        firstName: "first_name",
        lastName: "Last_name",
        email: "myemail@email.com",
        id: 1,
        userType: "user",
        password: "password",
      };
      const userEmail = "myemail@email.com";
      Users.findOne = jest.fn().mockResolvedValue(mockResponse);

      // act
      const result = await getOneByEmail(userEmail);

      // assert
      if(result){
        expect(result).toEqual(mockResponse);
        expect(Users.findOne).toHaveBeenCalledTimes(1);
        expect(Users.findOne).toHaveBeenCalledWith({
          where: { email: userEmail },
        });
      }
    
    });
  });
});
