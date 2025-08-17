import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BossEntity } from "./boss.entity";
import { EmployeesEntity } from "./employees.entity";

@Entity("company")
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => BossEntity, (boss) => boss.company)
    @JoinColumn({name: "boss_id"})
    boss: BossEntity;

    @Column({ unique: true })
    name: string;

    @Column({type: "timestamp"})
    created_at: Date;

    @Column({ unique: true })
    cnpj: string;

    @OneToMany(() => EmployeesEntity, (employees) => employees.company_id)
    employees: EmployeesEntity[];
}