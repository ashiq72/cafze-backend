import { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import { EventService } from "./event.service";

export class EventController {
  constructor(private readonly events = new EventService()) {}

  list = async (req: Request, res: Response) => {
    const result = await this.events.listEvents(req.query as never);

    res.json({
      success: true,
      data: result.items,
      meta: result.meta
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const event = await this.events.getEvent(id);

    res.json({
      success: true,
      data: event
    });
  };

  create = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "Authentication token is required");
    }

    const event = await this.events.createEvent(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: event
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const event = await this.events.updateEvent(id, req.body);

    res.json({
      success: true,
      data: event
    });
  };

  publish = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const event = await this.events.publishEvent(id);

    res.json({
      success: true,
      data: event
    });
  };

  cancel = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const event = await this.events.cancelEvent(id);

    res.json({
      success: true,
      data: event
    });
  };
}
