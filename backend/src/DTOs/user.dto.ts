import z from "zod";

const createUserScheme = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

const findUserByEmailScheme = z.object({
    email: z.string()
});

export type CreateUserDTO = z.infer<typeof createUserScheme>;
export type FindUserByEmailDTO = z.infer<typeof findUserByEmailScheme>;
