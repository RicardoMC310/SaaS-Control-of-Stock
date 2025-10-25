import z from "zod";

const userScheme = z.object({
    name: z.string().min(3, "mínimo de 3 caracteres para um nome!"),
    email: z.string().min(9, "digite um email válido"),
    password: z.string().min(8, "senha de no mínimo 8 dígitos")
});

export type UserDTO = z.infer<typeof userScheme>;