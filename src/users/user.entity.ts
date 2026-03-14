import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class User {

  @PrimaryColumn("uuid")
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date
}