import { EventStatus } from "@prisma/client";
import { AppError } from "../../shared/errors/app-error";
import { slugify } from "../../shared/utils/slugify";
import { EventRepository } from "./event.repository";
import { CreateEventInput, ListEventsInput, UpdateEventInput } from "./event.validation";

export class EventService {
  constructor(private readonly events = new EventRepository()) {}

  async listEvents(filters: ListEventsInput) {
    return this.events.list(filters);
  }

  async getEvent(id: string) {
    const event = await this.events.findById(id);

    if (!event) {
      throw new AppError(404, "Event not found");
    }

    return event;
  }

  async createEvent(organizerId: string, input: CreateEventInput) {
    this.assertValidSchedule(input.startsAt, input.endsAt);
    input.ticketTypes.forEach((ticket) => {
      this.assertValidTicketSaleWindow(ticket.saleStartsAt, ticket.saleEndsAt, input.startsAt);
    });

    const slug = input.slug ?? slugify(input.title);
    await this.assertSlugAvailable(slug);

    return this.events.create(organizerId, slug, input);
  }

  async updateEvent(id: string, input: UpdateEventInput) {
    const existing = await this.getEvent(id);

    if (input.startsAt || input.endsAt) {
      this.assertValidSchedule(input.startsAt ?? existing.startsAt, input.endsAt ?? existing.endsAt);
    }

    const nextSlug = input.slug ?? (input.title ? slugify(input.title) : undefined);

    if (nextSlug && nextSlug !== existing.slug) {
      await this.assertSlugAvailable(nextSlug);
    }

    if (input.status === EventStatus.PUBLISHED && existing.ticketTypes.length === 0) {
      throw new AppError(422, "At least one ticket type is required before publishing");
    }

    return this.events.update(id, nextSlug, input);
  }

  async publishEvent(id: string) {
    const event = await this.getEvent(id);

    if (event.status === EventStatus.CANCELLED) {
      throw new AppError(409, "Cancelled events cannot be published");
    }

    if (event.ticketTypes.length === 0) {
      throw new AppError(422, "At least one ticket type is required before publishing");
    }

    if (event.endsAt <= new Date()) {
      throw new AppError(422, "Past events cannot be published");
    }

    return this.events.publish(id);
  }

  async cancelEvent(id: string) {
    await this.getEvent(id);
    return this.events.cancel(id);
  }

  private async assertSlugAvailable(slug: string) {
    const existing = await this.events.findBySlug(slug);

    if (existing) {
      throw new AppError(409, "Event slug is already in use");
    }
  }

  private assertValidSchedule(startsAt: Date, endsAt: Date) {
    if (endsAt <= startsAt) {
      throw new AppError(422, "Event end time must be after start time");
    }
  }

  private assertValidTicketSaleWindow(
    saleStartsAt: Date | undefined,
    saleEndsAt: Date | undefined,
    eventStartsAt: Date
  ) {
    if (saleStartsAt && saleEndsAt && saleEndsAt <= saleStartsAt) {
      throw new AppError(422, "Ticket sale end time must be after sale start time");
    }

    if (saleEndsAt && saleEndsAt > eventStartsAt) {
      throw new AppError(422, "Ticket sales cannot end after the event starts");
    }
  }
}
