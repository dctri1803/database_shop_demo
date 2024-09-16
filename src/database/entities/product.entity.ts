import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProductImage } from './productImage.entity';
import { ProductDiscount } from './productDiscount.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  quantitySold: number;

  @Column()
  price: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[]

  @OneToMany(() => ProductImage, (productDiscount) => productDiscount.product)
  productDiscounts: ProductDiscount[]

}