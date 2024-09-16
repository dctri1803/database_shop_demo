import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductsDto } from '../dto/create-product.dto';
import { UpdateProductsDto } from '../dto/update-product.dto';
import { User } from 'src/database/entities/user.entity';
import { ProductImage } from 'src/database/entities/productImage.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductsServices {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private dataSource: DataSource,
  ) {}

  findAll() {
    return this.productsRepository.find()
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({
        id: id,
    });
  }

  async create(
    product: CreateProductsDto,
    user: User,
    files: Express.Multer.File[],
  ): Promise<Product> {
    let newProduct;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      newProduct = await queryRunner.manager.save(Product, {
        ...product,
        userId: user.id,
      });

      const subFolderDir = `products/${newProduct.id.toString()}`;
      const folderDir = path.join('public', subFolderDir);

      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }

      const productImages = files.map((file) => {
        const filePath = `${folderDir}/${file.originalname}`;
        fs.writeFileSync(filePath, file.buffer);

        return {
          imageUrl: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
          productId: newProduct.id,
        };
      });

      const newProductImages = await queryRunner.manager.save(
        ProductImage,
        productImages,
      );

      newProduct.productImages = newProductImages;
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return newProduct;
  }
 
  async update(
    id: number,
    updateProducts: UpdateProductsDto,
    files?: Express.Multer.File[],
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.findOne(id);

      if (!product) throw new Error('Product not found');
      
      await queryRunner.manager.update(Product, { id }, updateProducts);

      if (files && files.length > 0) {
        // Delete old images from server
        product.productImages.forEach((image) => {
          const imagePath = path.join('public', image.imageUrl);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        });

        // Delete old images from the database
        await queryRunner.manager.delete(ProductImage, { productId: id });

        // Add new images
        const subFolderDir = `products/${id.toString()}`;
        const folderDir = path.join('public', subFolderDir);

        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir, { recursive: true });
        }

        const newProductImages = files.map((file) => {
          const filePath = `${folderDir}/${file.originalname}`;
          fs.writeFileSync(filePath, file.buffer);

          return {
            imageUrl: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
            productId: id,
          };
        });

        await queryRunner.manager.save(ProductImage, newProductImages);
      }

      await queryRunner.commitTransaction();

      return await this.findOne(id); // Return updated product with new images
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.findOne(id);

      if (!product) throw new Error('Product not found');

      product.productImages.forEach((image) => {
        const imagePath = path.join('public', image.imageUrl);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });

      await queryRunner.manager.delete(ProductImage, { productId: id });
      await queryRunner.manager.delete(Product, { id });

      await queryRunner.commitTransaction();

      return `Deleted product with id: ${id} successfully`;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
