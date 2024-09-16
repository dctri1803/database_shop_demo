import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Discount } from './discount.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  favoriteTheme: string;

  @Expose() 
  get greeting() : string {
    return `Hello ${this.name}`;
  }

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Discount, (discount) => discount.user)
  discounts: Discount[];

}