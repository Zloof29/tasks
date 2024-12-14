import Joi from "joi";
import { Role } from "./enums";
import { CredentialsModel } from "./credentials-model";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  public static validateRegistration(user: UserModel) {
    const schema = Joi.object({
        id: Joi.number().optional(),
      firstName: Joi.string().min(2).max(30).required(),
      lastName: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
        roleId: Joi.number().optional(),
    });

    return schema.validate(user);
  }

  public static validateLogIn(credentials: CredentialsModel) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    return schema.validate(credentials);
  }
}
