import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "O nome é obrigatório.")
      .max(44, "O nome é muito grande."),
    email: z
      .string()
      .email("Precisa ser um email válido.")
      .refine((email) => email.endsWith("@edge.ufal.br"), {
        message: "O email precisa ser institucional do EDGE",
      }),
    password: z
      .string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres.")
      .refine((password) => /[A-Z]/.test(password), {
        message: "A senha precisa ter uma letra maiúscula",
      })
      .refine((password) => /^(?=.*[0-9])/.test(password), {
        message: "A senha precisa ter pelo menos um número.",
      }),
  })
  .transform((fields) => ({
    password: fields.password,
    email: fields.email,
    username: fields.username.trim(),
  }));

export const loginSchema = z
  .object({
    email: z.string().email("Precisa ser um email válido."),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
  })
  .transform((fields) => ({
    password: fields.password,
    email: fields.email,
  }));
