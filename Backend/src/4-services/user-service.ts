import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError } from "../3-models/client-error";

// Deals with users:
class UserService {
  private async isEmailExists(email: string): Promise<boolean> {
    const sql = "select count(*) as count from users where email = ?";
    const result = await dal.execute(sql, [email]);
    return result[0].count > 0;
  }

  // Register new user:
  public async register(user: UserModel) {
    const { error } = UserModel.validateRegistration(user);
    if (error) throw new Error(error.details[0].message);

    const emailExists = await this.isEmailExists(user.email);
    if (emailExists) throw new Error("Email already exists");

    // SQL:
    const sql = "insert into users values(default,?,?,?,?,?)";

    // Set role as regular user and not something else:
    user.roleId = Role.User;

    // Hash password:
    user.password = cyber.hash(user.password);

    // Values:
    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, values);

    // Set back id:
    user.id = info.insertId;

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }

  public async login(credentials: CredentialsModel) {
    const { error } = UserModel.validateLogIn(credentials);
    if (error) throw new Error(error.details[0].message);

    // SQL:
    const sql = "select * from users where email = ? and password = ?";

    // Hash password:
    credentials.password = cyber.hash(credentials.password);

    // const sql = `select * from users where email = '${credentials.email}' and password = '${credentials.password}'`;

    // Values:
    const values = [credentials.email, credentials.password];

    // Execute:
    const users = await dal.execute(sql, values);
    // const users = await dal.execute(sql);

    // Extract user:
    const user = users[0];

    // If no user:
    if (!user) throw new UnauthorizedError("Incorrect email or password.");

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }
}

export const userService = new UserService();
