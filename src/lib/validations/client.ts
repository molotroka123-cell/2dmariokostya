import { z } from "zod";

export const clientCreateSchema = z.object({
  name: z.string().min(1, "Имя обязательно").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{5,}$/, "Некорректный номер телефона")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  email: z
    .string()
    .email("Некорректный email")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  notes: z.string().max(2000).optional(),
});

export const clientUpdateSchema = clientCreateSchema.partial();

export type ClientCreateInput = z.infer<typeof clientCreateSchema>;
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>;
