import { z } from "zod";

export const bookingStatusSchema = z.enum([
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);

export const bookingCreateSchema = z.object({
  clientId: z.string().min(1),
  serviceId: z.string().min(1),
  staffId: z.string().optional().nullable(),
  startsAt: z.coerce.date(),
  notes: z.string().max(2000).optional(),
});

export const bookingUpdateSchema = z
  .object({
    clientId: z.string().min(1),
    serviceId: z.string().min(1),
    staffId: z.string().nullable(),
    startsAt: z.coerce.date(),
    notes: z.string().max(2000),
    status: bookingStatusSchema,
  })
  .partial();

export const bookingStatusUpdateSchema = z.object({
  status: bookingStatusSchema,
});

export const publicBookingSchema = z.object({
  serviceId: z.string().min(1),
  startsAt: z.coerce.date(),
  name: z.string().min(1).max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{5,}$/, "Некорректный номер телефона"),
  email: z.string().email().optional().or(z.literal("").transform(() => undefined)),
  notes: z.string().max(2000).optional(),
});

export const bookingListQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  status: bookingStatusSchema.optional(),
  clientId: z.string().optional(),
  staffId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;
export type BookingUpdateInput = z.infer<typeof bookingUpdateSchema>;
export type PublicBookingInput = z.infer<typeof publicBookingSchema>;
