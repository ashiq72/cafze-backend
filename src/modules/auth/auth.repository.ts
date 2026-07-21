import { prisma } from "../../config/prisma";
import { RegisterInput } from "./auth.validation";

export class AuthRepository {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  createUser(input: RegisterInput, passwordHash: string) {
    return prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        fullName: input.fullName,
        phone: input.phone
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      }
    });
  }
}
