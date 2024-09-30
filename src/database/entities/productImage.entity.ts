import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('productimages')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    imageUrl: string;

    @Column()
    productId: number;

    @ManyToOne(() => Product, (product) => product.productImages)
    product: Product;
}
