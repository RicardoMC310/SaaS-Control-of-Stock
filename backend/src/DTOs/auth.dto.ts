import z from "zod";

const authLoginScheme = z.object({
    email: z.string().min(9, "Email inválido!"),
    password: z.string().min(8, "Senha muito curta")
});

export type AuthLoginDTO = z.infer<typeof authLoginScheme>;