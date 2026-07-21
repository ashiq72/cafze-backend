import { EventStatus } from "@prisma/client";
import { z } from "zod";

const uuid = z.string().uuid();

const ticketTypeInput = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(300).optional(),
  price: z.coerce.number().nonnegative(),
  currency: z.string().length(3).default("BDT"),
  totalQuantity: z.coerce.number().int().positive(),
  maxPerOrder: z.coerce.number().int().positive().max(20).default(10),
  saleStartsAt: z.coerce.date().optional(),
  saleEndsAt: z.coerce.date().optional(),
  isActive: z.boolean().default(true)
});

export const eventCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(180),
    slug: z.string().min(3).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    summary: z.string().max(300).optional(),
    description: z.string().min(10),
    venueId: uuid.optional(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    timezone: z.string().max(80).default("Asia/Dhaka"),
    coverImageUrl: z.string().url().max(500).optional(),
    categoryIds: z.array(uuid).default([]),
    ticketTypes: z.array(ticketTypeInput).min(1)
  })
});

export const eventUpdateSchema = z.object({
  params: z.object({
    id: uuid
  }),
  body: eventCreateSchema.shape.body
    .omit({ ticketTypes: true })
    .partial()
    .extend({
      status: z.nativeEnum(EventStatus).optional(),
      categoryIds: z.array(uuid).optional()
    })
});

export const eventListSchema = z.object({
  query: z.object({
    search: z.string().trim().min(1).optional(),
    status: z.nativeEnum(EventStatus).optional(),
    categorySlug: z.string().trim().min(1).optional(),
    startsAfter: z.coerce.date().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20)
  })
});

export const eventIdSchema = z.object({
  params: z.object({
    id: uuid
  })
});

export const eventPublishSchema = eventIdSchema;

export type CreateEventInput = z.infer<typeof eventCreateSchema>["body"];
export type UpdateEventInput = z.infer<typeof eventUpdateSchema>["body"];
export type ListEventsInput = z.infer<typeof eventListSchema>["query"];
