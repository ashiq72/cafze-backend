import { EventStatus, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { CreateEventInput, ListEventsInput, UpdateEventInput } from "./event.validation";

// Define reusable include object to fetch related data with event
const eventInclude = {
  organizer: {
    select: {
      id: true,
      name: true,
      email: true
    }
  },
  venue: true,
  categories: {
    include: {
      category: true
    }
  },
  ticketTypes: {
    orderBy: {
      price: "asc"
    }
  }
} satisfies Prisma.EventInclude;

export class EventRepository {
  // Find a single event by its ID
  findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: eventInclude
    });
  }

  // Find a single event by its slug (SEO-friendly identifier)
  findBySlug(slug: string) {
    return prisma.event.findUnique({
      where: { slug },
      include: eventInclude
    });
  }

  // Get a paginated list of events with filtering
  async list(filters: ListEventsInput) {
    // Build dynamic query conditions
    const where: Prisma.EventWhereInput = {
      status: filters.status,

      // Filter events starting after a certain date
      startsAt: filters.startsAfter ? { gte: filters.startsAfter } : undefined,

      // Search by title OR summary (case insensitive)
      OR: filters.search
        ? [
            { title: { contains: filters.search, mode: "insensitive" } },
            { summary: { contains: filters.search, mode: "insensitive" } }
          ]
        : undefined,

      // Filter by category slug
      categories: filters.categorySlug
        ? {
            some: {
              category: {
                slug: filters.categorySlug
              }
            }
          }
        : undefined
    };

    // Calculate pagination offset
    const skip = (filters.page - 1) * filters.limit;

    // Run both queries in a transaction:
    // 1. Get events
    // 2. Count total events
    const [items, total] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        include: eventInclude,
        orderBy: [{ startsAt: "asc" }, { createdAt: "desc" }],
        skip,
        take: filters.limit
      }),
      prisma.event.count({ where })
    ]);

    // Return paginated response
    return {
      items,
      meta: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit)
      }
    };
  }

  // Create a new event
  create(organizerId: string, slug: string, input: CreateEventInput) {
    return prisma.event.create({
      data: {
        organizerId,
        venueId: input.venueId,
        title: input.title,
        slug,
        summary: input.summary,
        description: input.description,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
        timezone: input.timezone,
        coverImageUrl: input.coverImageUrl,

        // Create event-category relationships
        categories: {
          create: input.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        },

        // Create ticket types for the event
        ticketTypes: {
          create: input.ticketTypes.map((ticket) => ({
            name: ticket.name,
            description: ticket.description,
            price: ticket.price,
            currency: ticket.currency,
            totalQuantity: ticket.totalQuantity,
            maxPerOrder: ticket.maxPerOrder,
            saleStartsAt: ticket.saleStartsAt,
            saleEndsAt: ticket.saleEndsAt,
            isActive: ticket.isActive
          }))
        }
      },
      include: eventInclude
    });
  }

  // Update an existing event
  update(id: string, slug: string | undefined, input: UpdateEventInput) {
    const { categoryIds, ...eventData } = input;

    return prisma.$transaction(async (tx) => {
      // If categories are provided, reset them
      if (categoryIds) {
        // Remove old category relations
        await tx.eventCategory.deleteMany({ where: { eventId: id } });

        // Insert new category relations
        await tx.eventCategory.createMany({
          data: categoryIds.map((categoryId) => ({ eventId: id, categoryId })),
          skipDuplicates: true
        });
      }

      // Update main event data
      return tx.event.update({
        where: { id },
        data: {
          ...eventData,
          slug
        },
        include: eventInclude
      });
    });
  }

  // Publish an event (make it visible/live)
  publish(id: string) {
    return prisma.event.update({
      where: { id },
      data: {
        status: EventStatus.PUBLISHED,
        publishedAt: new Date()
      },
      include: eventInclude
    });
  }

  // Cancel an event
  cancel(id: string) {
    return prisma.event.update({
      where: { id },
      data: {
        status: EventStatus.CANCELLED
      },
      include: eventInclude
    });
  }
}