import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";
import { BossEntity } from "./boss.entity";

export enum EmployeesRules {
    BOSS = "Boss",
    ADMIN = "Admin",
    SALESMAN = "Salesman",
    GUEST = "Guest"
}

@Entity("employees")
export class EmployeesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ enum: EmployeesRules })
    rules: EmployeesRules;

    @ManyToOne(() => CompanyEntity, (company) => company.employees, { onDelete: "CASCADE" })
    @JoinColumn({name: "company_id"})
    company_id: CompanyEntity;

    @ManyToOne(() => BossEntity, (boss) => boss.employees)
    @JoinColumn({name: "boss_id"})
    boss_id: BossEntity;

}