import z from "zod";

const createProductScheme = z.object({
    name: z.string(),
    quantity: z.int(),
    minQuantity: z.int(),
    purchasePrice: z.float64(),
    salesPrice: z.float64(),
    code: z.string(),
    userID: z.number()
});

export type CreateProductDTO = z.infer<typeof createProductScheme>;