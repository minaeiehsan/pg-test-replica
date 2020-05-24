import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Entity1 } from "./Entity1";

@Entity()
export class Entity2 {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ type: "varchar" })
  public content: string;

  @Index()
  @Column({ type: "integer" })
  public entity1Id: number;

  @ManyToOne(
    () => Entity1,
    (entity1) => entity1.entities2,
    { nullable: false }
  )
  @JoinColumn({ name: "entity1Id" })
  public entity1: Entity1;
}
