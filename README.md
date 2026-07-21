# Cafze Backend

Node.js, Express, TypeScript, Prisma, and Supabase PostgreSQL backend for `cafze.com`.

This backend is intentionally relational. It does not copy the previous MongoDB document shape from `base360`; orders, ticket items, ticket types, events, venues, categories, payments, and support tickets are modeled as separate normalized PostgreSQL tables.

## Folder Structure

```text
cafze-backend/
├─ prisma/
│  └─ schema.prisma
├─ prisma.config.ts
├─ src/
│  ├─ app.ts
│  ├─ routes.ts
│  ├─ server.ts
│  ├─ config/
│  │  ├─ env.ts
│  │  └─ prisma.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.repository.ts
│  │  │  ├─ auth.routes.ts
│  │  │  ├─ auth.service.ts
│  │  │  └─ auth.validation.ts
│  │  ├─ event/
│  │  │  ├─ event.controller.ts
│  │  │  ├─ event.repository.ts
│  │  │  ├─ event.routes.ts
│  │  │  ├─ event.service.ts
│  │  │  └─ event.validation.ts
│  │  ├─ order/
│  │  ├─ payment/
│  │  ├─ support/
│  │  ├─ ticket/
│  │  └─ user/
│  ├─ shared/
│  │  ├─ errors/
│  │  │  └─ app-error.ts
│  │  ├─ middleware/
│  │  │  ├─ auth.ts
│  │  │  ├─ error-handler.ts
│  │  │  └─ validate.ts
│  │  └─ utils/
│  │     ├─ async-handler.ts
│  │     └─ slugify.ts
│  └─ types/
│     └─ express.d.ts
├─ .env.example
├─ package.json
└─ tsconfig.json
```

## Relational Model

Core relationships:

- `User -> Order`: one user can place many orders.
- `User -> Event`: organizers/admins can own events.
- `Event -> TicketType`: each event has one or more ticket types with inventory.
- `Order -> TicketItem -> TicketType`: ticket items normalize the many-to-many booking relationship and store price/name snapshots.
- `Order -> Payment`: an order can have multiple payment attempts.
- `Event -> Category`: many-to-many through `EventCategory`.
- `SupportTicket -> User`: support tickets belong to users and can optionally reference an order in future schema expansion.

Important schema choices:

- UUID primary keys for distributed-safe identifiers.
- PostgreSQL enums for stable domain states: user role, event status, order status, payment status, provider, and support state.
- Decimal fields for money.
- Indexed lookup paths for event discovery, order history, and payment reconciliation.
- Snapshot fields on `TicketItem` so historic orders remain accurate if ticket prices change later.

## Supabase and Prisma Setup

1. Create a Supabase project.
2. Open Project Settings -> Database.
3. Copy the pooled connection string for `DATABASE_URL`.
4. Copy the direct connection string for `DIRECT_URL`.
5. Add `sslmode=require` to both URLs.
6. Copy `.env.example` to `.env` and fill in secrets.

Use pooled connections for app runtime:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require"
```

Use the direct connection for migrations:

```env
DIRECT_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require"
```

Prisma 7 note:

- `prisma/schema.prisma` keeps only `provider = "postgresql"` in the datasource.
- `prisma.config.ts` provides the migration datasource URL.
- `src/config/prisma.ts` passes the PostgreSQL driver adapter to `PrismaClient`.

This project uses custom JWT auth first. Supabase Auth and Storage can be added later without changing the PostgreSQL provider.

## Scripts

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

Useful commands:

```bash
npm run build
npm run lint
npm run prisma:studio
npm run prisma:deploy
```

## Implemented API

Base path defaults to `/api/v1`.

Auth:

- `POST /auth/register`
- `POST /auth/login`

Events:

- `GET /events`
- `GET /events/:id`
- `POST /events`
- `PATCH /events/:id`
- `POST /events/:id/publish`
- `POST /events/:id/cancel`

Event write endpoints require a Bearer token and the `ADMIN` or `ORGANIZER` role.

Example event create body:

```json
{
  "title": "Cafze Music Night",
  "summary": "Live music, food, and community.",
  "description": "A full evening event with multiple performers and food stalls.",
  "startsAt": "2026-08-15T13:00:00.000Z",
  "endsAt": "2026-08-15T18:00:00.000Z",
  "timezone": "Asia/Dhaka",
  "categoryIds": [],
  "ticketTypes": [
    {
      "name": "General Admission",
      "price": 500,
      "currency": "BDT",
      "totalQuantity": 300,
      "maxPerOrder": 5
    }
  ]
}
```

## Next Build Steps

Recommended order:

1. Add seed data for admin user, categories, and venues.
2. Implement ticket inventory updates inside database transactions.
3. Implement order creation with row-level consistency checks.
4. Add payment provider webhooks.
5. Add support ticket CRUD.
6. Add integration tests around order creation and ticket inventory.
