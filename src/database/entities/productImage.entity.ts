import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('productimagaes')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updateAt: Date;

    @Column()
    imageUrl: string;

    @Column()
    productId: number;

    @ManyToOne(() => Product, (product) => product.productImages)
    product: Product;
}
