import { EventStatus, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { CreateEventInput, ListEventsInput, UpdateEventInput } from "./event.validation";

const eventInclude = {
  organizer: {
    select: {
      id: true,
      fullName: true,
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
  findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: eventInclude
    });
  }

  findBySlug(slug: string) {
    return prisma.event.findUnique({
      where: { slug },
      include: eventInclude
    });
  }

  async list(filters: ListEventsInput) {
    const where: Prisma.EventWhereInput = {
      status: filters.status,
      startsAt: filters.startsAfter ? { gte: filters.startsAfter } : undefined,
      OR: filters.search
        ? [
            { title: { contains: filters.search, mode: "insensitive" } },
            { summary: { contains: filters.search, mode: "insensitive" } }
          ]
        : undefined,
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

    const skip = (filters.page - 1) * filters.limit;

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
        categories: {
          create: input.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        },
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

  update(id: string, slug: string | undefined, input: UpdateEventInput) {
    const { categoryIds, ...eventData } = input;

    return prisma.$transaction(async (tx) => {
      if (categoryIds) {
        await tx.eventCategory.deleteMany({ where: { eventId: id } });
        await tx.eventCategory.createMany({
          data: categoryIds.map((categoryId) => ({ eventId: id, categoryId })),
          skipDuplicates: true
        });
      }

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
