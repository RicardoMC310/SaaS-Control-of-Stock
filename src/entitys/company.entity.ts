import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BossEntity } from "./boss.entity";

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
}