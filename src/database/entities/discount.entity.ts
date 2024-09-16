import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  discountType: string;

  @Column()
  discountAmount: number;

  @Column()
  expiredAt: Date;

  @Column()
  startAt: Date;

  @Column()
  discountStatus: string;

  @Column()
  adminId: number;

  @ManyToOne(() => User, (user) => user.discounts)
  user: User;

}