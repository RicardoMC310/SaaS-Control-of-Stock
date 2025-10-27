import { ProductEntity } from "../entities/product.entity";
import prisma from "../prisma";
import handleErrorsPrisma from "../utils/HandlingErrorsPrisma";
import { IProductRepository } from "./product.repositories";

class ProductPostgresRepository implements IProductRepository{

    public async Save(productEntity: ProductEntity, userID: number): Promise<ProductEntity> {
        let productData;
        let {name, quantity, minQuantity, code, purchasePrice, salesPrice} = productEntity.getAllValueFields();

        let quantityNumber = parseInt(quantity, 10);
        let minQuantityNumber = parseInt(minQuantity, 10);

        try {
            productData = await prisma.product.create({
                data: {
                    name, quantity: quantityNumber, minQuantity: minQuantityNumber, code, purchasePrice, salesPrice,
                    createdAt: new Date(), updatedAt: new Date(), userId: userID
                }
            });
        } catch (error) {
            handleErrorsPrisma(error);
        }

        return Object.assign(new ProductEntity(), productData);
    }

}

export function createProductPostgresRepository(): ProductPostgresRepository {
    return new ProductPostgresRepository();
}