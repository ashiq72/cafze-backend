import { Router } from "express";
import { validate } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();
const controller = new AuthController();

router.post("/register", validate(registerSchema), asyncHandler(controller.register));
router.post("/login", validate(loginSchema), asyncHandler(controller.login));

export const authRoutes = router;
