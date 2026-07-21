import { Router } from "express";
import { UserRole } from "@prisma/client";
import { requireAuth, requireRoles } from "../../shared/middleware/auth";
import { validate } from "../../shared/middleware/validate";
import { asyncHandler } from "../../shared/utils/async-handler";
import { EventController } from "./event.controller";
import {
  eventCreateSchema,
  eventIdSchema,
  eventListSchema,
  eventPublishSchema,
  eventUpdateSchema
} from "./event.validation";

const router = Router();
const controller = new EventController();
const canManageEvents = [UserRole.ADMIN, UserRole.ORGANIZER];

router.get("/", validate(eventListSchema), asyncHandler(controller.list));
router.get("/:id", validate(eventIdSchema), asyncHandler(controller.getById));

router.post(
  "/",
  requireAuth,
  requireRoles(...canManageEvents),
  validate(eventCreateSchema),
  asyncHandler(controller.create)
);

router.patch(
  "/:id",
  requireAuth,
  requireRoles(...canManageEvents),
  validate(eventUpdateSchema),
  asyncHandler(controller.update)
);

router.post(
  "/:id/publish",
  requireAuth,
  requireRoles(...canManageEvents),
  validate(eventPublishSchema),
  asyncHandler(controller.publish)
);

router.post(
  "/:id/cancel",
  requireAuth,
  requireRoles(...canManageEvents),
  validate(eventIdSchema),
  asyncHandler(controller.cancel)
);

export const eventRoutes = router;
