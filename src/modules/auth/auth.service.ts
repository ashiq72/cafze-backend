import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import { AuthRepository } from "./auth.repository";
import { LoginInput, RegisterInput } from "./auth.validation";

export class AuthService {
  constructor(private readonly auth = new AuthRepository()) {}

  async register(input: RegisterInput) {
    const email = input.email.toLowerCase();
    const existing = await this.auth.findUserByEmail(email);

    if (existing) {
      throw new AppError(409, "Email is already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, env.BCRYPT_SALT_ROUNDS);
    const user = await this.auth.createUser({ ...input, email }, passwordHash);

    return {
      user,
      token: this.signToken(user.id, user.email, user.role)
    };
  }

  async login(input: LoginInput) {
    const user = await this.auth.findUserByEmail(input.email.toLowerCase());

    if (!user || !user.isActive) {
      throw new AppError(401, "Invalid email or password");
    }

    const matches = await bcrypt.compare(input.password, user.passwordHash);

    if (!matches) {
      throw new AppError(401, "Invalid email or password");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: this.signToken(user.id, user.email, user.role)
    };
  }

  private signToken(id: string, email: string, role: string) {
    const options: SignOptions = {
      subject: id,
      expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
    };

    return jwt.sign({ email, role }, env.JWT_SECRET, {
      ...options
    });
  }
}
