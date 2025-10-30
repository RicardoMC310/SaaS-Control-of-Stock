import { CreateProductDTO } from "../DTOs/product.dto";
import { ProductEntity } from "../entities/product.entity";
import { IProductRepository } from "../repositories/product.repositories";

class ProductService {
    constructor(private readonly repository: IProductRepository) {}

    public async createNewProduct(productDTO: CreateProductDTO): Promise<ProductEntity> {
        let productEntity: ProductEntity = new ProductEntity();

        productEntity.setFieldsWithCreateProductDTO(productDTO);

        return await this.repository.Save(productEntity, productDTO.userID);
    }

    public async findAll({userId}: {userId: number}) {
        return await this.repository.FindAll(userId);
    }
}

export function createProductService(repository: IProductRepository): ProductService {
    return new ProductService(repository);
}