import express, { type Router, type Request, type Response } from "express";
import { IProductRepository } from "../repositories/product.repositories";
import { createProductPostgresRepository } from "../repositories/product.postgres-repository";
import { createProductService } from "../services/product.service";
import { HttpStatus, returnAPI, returnErrorAPI } from "../utils/APIUtils";
import { ProductEntity } from "../entities/product.entity";

const PRODUCT_ROUTER: Router = express.Router();
const REPOSITORY: IProductRepository = createProductPostgresRepository();
const SERVICE = createProductService(REPOSITORY);

PRODUCT_ROUTER.post("/create", async (req: Request, res: Response) => {
    try {
        const product: ProductEntity = await SERVICE.createNewProduct(req.body);

        returnAPI(res, HttpStatus.CREATED, product);
        
    } catch (error) {
        returnErrorAPI(res, error);
    }
});

export default PRODUCT_ROUTER;