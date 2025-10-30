import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    Save(productEntity: ProductEntity, userID: number): Promise<ProductEntity>;
    FindAll(userId: number): Promise<ProductEntity[] | unknown[]>;
}