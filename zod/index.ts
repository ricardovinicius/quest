import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Precisa ser um email válido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
  })
  .transform((fields) => ({
    password: fields.password,
    email: fields.email,
  }));
