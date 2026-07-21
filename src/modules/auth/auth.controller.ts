import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly auth = new AuthService()) {}

  register = async (req: Request, res: Response) => {
    const result = await this.auth.register(req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  };

  login = async (req: Request, res: Response) => {
    const result = await this.auth.login(req.body);

    res.json({
      success: true,
      data: result
    });
  };
}
