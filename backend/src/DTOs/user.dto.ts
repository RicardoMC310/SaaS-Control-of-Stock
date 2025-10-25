import z from "zod";

const createUserScheme = z.object({
    name: z.string().min(3, "mínimo de 3 caracteres para um nome!"),
    email: z.string().min(9, "digite um email válido"),
    password: z.string().min(8, "senha de no mínimo 8 dígitos")
});

const findUserByEmailScheme = z.object({
    email: z.string().min(9, "digite um email válido"),
});

export type CreateUserDTO = z.infer<typeof createUserScheme>;
export type FindUserByEmailDTO = z.infer<typeof findUserByEmailScheme>;
