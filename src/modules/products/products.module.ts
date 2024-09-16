import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { ProductsServices } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductImage } from 'src/database/entities/productImage.entity';
import { ProductCategory } from 'src/database/entities/productCategory.entity';
import { ProductDiscount } from 'src/database/entities/productDiscount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, ProductCategory, ProductDiscount])],
  providers: [ProductsServices],
  controllers: [ProductsController],
})
export class ProductModule {}
