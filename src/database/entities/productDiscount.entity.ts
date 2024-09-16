import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductDiscount {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updateAt: Date;

    @Column()
    productId: number;

    @Column()
    discountId: number;
    
    @ManyToOne(() => Product, (product) => product.productDiscounts)
    product: Product;

}
