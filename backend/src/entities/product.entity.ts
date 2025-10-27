import { CreateProductDTO } from "../DTOs/product.dto";
import { Code } from "../utils/types/Code";
import { Name } from "../utils/types/Name";
import { Price } from "../utils/types/Price";
import { Quantity } from "../utils/types/Quantity";

export class ProductEntity {
    private id?: number;
    private name?: Name;
    private quantity?: Quantity;
    private minQuantity?: Quantity;
    private purchasePrice?: Price;
    private salesPrice?: Price;
    private code?: Code;
    private createdAt?: Date;
    private updatedAt?: Date;

    public setFieldsWithCreateProductDTO(productDTO: CreateProductDTO) {
        this.name = new Name(productDTO.name);
        this.quantity = new Quantity(productDTO.quantity);
        this.minQuantity = new Quantity(productDTO.minQuantity);
        this.purchasePrice = new Price(productDTO.purchasePrice);
        this.salesPrice = new Price(productDTO.salesPrice);
        this.code = new Code(productDTO.code);

    }

    public getAllValueFields() {
        return {
            id: this.id,
            name: String(this.name),
            quantity: String(this.quantity),
            minQuantity: String(this.minQuantity),
            purchasePrice: String(this.purchasePrice),
            salesPrice: String(this.salesPrice),
            code: String(this.code),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

};