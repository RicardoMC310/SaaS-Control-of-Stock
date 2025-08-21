import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ProductState {
    AVAILABLE = "Available",
    UNAVAILABLE = "Unavailable",
    LOW = "LOW"
};

@Entity("product")
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: number;

    @Column()
    quantity_current: number;

    @Column({enum: ProductState})
    state: ProductState;

    @Column()
    price: number;

    @Column()
    category: string;

}