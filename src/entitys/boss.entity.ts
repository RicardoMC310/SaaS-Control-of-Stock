import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";
import { EmployeesEntity, EmployeesRules } from "./employees.entity";
@Entity('boss')
export class BossEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ enum: EmployeesRules, default: EmployeesRules.BOSS })
    rules: EmployeesRules;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => CompanyEntity, (company) => company.boss, { onDelete: "CASCADE" })
    company: CompanyEntity;

    @OneToMany(() => EmployeesEntity, (employees) => employees.boss_id, { onDelete: "CASCADE" })
    employees: EmployeesEntity[];
};