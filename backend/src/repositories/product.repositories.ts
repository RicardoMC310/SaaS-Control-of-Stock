import { FiltersAllowDTO } from "../DTOs/filters.dto";
import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    Save(productEntity: ProductEntity, userID: number): Promise<ProductEntity>;
    FindAll(userId: number): Promise<ProductEntity[] | unknown[]>;
    FindByFilters(filters: FiltersAllowDTO, userId: number): Promise<ProductEntity[] | unknown[]>;
}