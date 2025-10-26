import z from "zod";

const authLoginScheme = z.object({
    email: z.string(),
    password: z.string()
});

const authValidateTokenScheme = z.object({
    token: z.string()
});

export type AuthLoginDTO = z.infer<typeof authLoginScheme>;
export type AuthValidateTokenDTO = z.infer<typeof authValidateTokenScheme>;