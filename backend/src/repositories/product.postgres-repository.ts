import { FiltersAllowDTO } from "../DTOs/filters.dto";
import { ProductEntity } from "../entities/product.entity";
import { ProductWhereInput } from "../generated/prisma/models";
import prisma from "../prisma";
import handleErrorsPrisma from "../utils/HandlingErrorsPrisma";
import { IProductRepository } from "./product.repositories";

class ProductPostgresRepository implements IProductRepository {

    public async Save(productEntity: ProductEntity, userID: number): Promise<ProductEntity> {
        let productData;
        let { name, quantity, minQuantity, code, purchasePrice, salesPrice } = productEntity.getAllValueFields();

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

    public async FindAll(userId: number): Promise<ProductEntity[] | unknown[]> {
        let productsData;

        try {
            productsData = await prisma.product.findMany({
                where: {
                    userId
                }
            });

            return productsData.map(product => {
                const productEntity = new ProductEntity();
                Object.assign(productEntity, product);
                return productEntity;
            });
        } catch (error) {
            handleErrorsPrisma(error);
        }
        return [];
    }

    public async FindByFilters(filters: FiltersAllowDTO, userId: number): Promise<ProductEntity[] | unknown[]> {
        let productsData;

        try {
            const where: ProductWhereInput = this.buildWhereClause(filters);

            productsData = await prisma.product.findMany({
                where: { ...where, userId },
                orderBy: {
                    id: "asc"
                },
                include: {
                    User: true,
                }
            });

            return productsData.map(product => {
                let productEntity = new ProductEntity();
                Object.assign(productEntity, product);
                return productEntity;
            });

        } catch (error) {
            handleErrorsPrisma(error);
        }

        return [];
    }

    private buildWhereClause(filters: FiltersAllowDTO): ProductWhereInput {
        const textFilters = [
            { key: "name" as const, value: filters.name },
            { key: "code" as const, value: filters.code },
        ]

        const rangeFilters = [
            { key: "purchasePrice" as const, min: filters.minPurchasePrice, max: filters.maxPurchasePrice },
            { key: "salesPrice" as const, min: filters.minSalesPrice, max: filters.maxSalesPrice },
            { key: "quantity" as const, min: filters.minTotalQuantity, max: filters.maxTotalQuantity },
        ]

        const where: ProductWhereInput = {};

        textFilters.forEach(({ key, value }) => {
            if (value) {
                where[key] = { contains: value, mode: "insensitive" };
            }
        });

        rangeFilters.forEach(({ key, min, max }) => {
            const range = this.buildRangeFilter(min, max);
            if (range) {
                where[key] = range;
            }
        });

        return where;
    }

    private buildRangeFilter(min?: any, max?: any): any {
        if (!min && !max) return undefined;

        const filter: any = {};
        if (min) filter.gte = min;
        if (max) filter.lte = max;

        return filter;
    }

    // private buildWhereClause(filters: FiltersAllowDTO): ProductWhereInput {
    //     let where: ProductWhereInput = {};

    //     if (filters.name) {
    //         where.name = {
    //             contains: filters.name,
    //             mode: "insensitive"
    //         };
    //     }

    //     if (filters.code) {
    //         where.code = {
    //             contains: filters.code,
    //             mode: "insensitive"
    //         };
    //     }

    //     if (filters.minPurchasePrice || filters.maxPurchasePrice) {
    //         where.purchasePrice = {};

    //         if (filters.minPurchasePrice) {
    //             where.purchasePrice.gte = filters.minPurchasePrice;
    //         }
    //         if (filters.maxPurchasePrice) {
    //             where.purchasePrice.lte = filters.maxPurchasePrice;
    //         }
    //     }

    //     if (filters.minSalesPrice || filters.maxSalesPrice) {
    //         where.salesPrice = {};

    //         if (filters.minSalesPrice) {
    //             where.salesPrice.gte = filters.minSalesPrice;
    //         }
    //         if (filters.maxSalesPrice) {
    //             where.salesPrice.lte = filters.maxSalesPrice;
    //         }
    //     }

    //     if (filters.minTotalQuantity || filters.maxTotalQuantity) {
    //         where.quantity = {};

    //         if (filters.minTotalQuantity) {
    //             where.quantity.gte = filters.minTotalQuantity;
    //         }
    //         if (filters.maxTotalQuantity) {
    //             where.quantity.lte = filters.maxTotalQuantity;
    //         }
    //     }

    //     return where;
    // }

}

export function createProductPostgresRepository(): ProductPostgresRepository {
    return new ProductPostgresRepository();
}