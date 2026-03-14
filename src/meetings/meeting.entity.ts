import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Meeting {

  @PrimaryColumn()
  id: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}