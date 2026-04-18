import { z } from "zod";

export const serviceCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  durationMinutes: z.coerce.number().int().min(5).max(24 * 60),
  priceCents: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
