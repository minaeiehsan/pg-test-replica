import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Entity2 } from "./Entity2";

type JSON = {
  key: string;
  values: { key: string; value: string }[];
};

@Index("unique_uq1_uq2_idx", ["uq1", "uq2"])
@Entity()
export class Entity1 {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ type: "varchar" })
  public content: string;

  @Column({ type: "json" })
  public json: JSON;

  @Index()
  @Column({ type: "integer" })
  public idx: number;

  @Column({ type: "integer" })
  public uq1: number;

  @Column({ type: "integer" })
  public uq2: number;

  @OneToMany(
    () => Entity2,
    (entity2) => entity2.entity1
  )
  public entities2: Entity2[];
}
