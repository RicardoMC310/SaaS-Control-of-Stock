import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
};