import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";
@Entity('boss')
export class BossEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => CompanyEntity, (company) => company.boss, { onDelete: "CASCADE" })
    company: CompanyEntity;
};