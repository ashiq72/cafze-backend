import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { eventRoutes } from "./modules/event/event.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/events", eventRoutes);
