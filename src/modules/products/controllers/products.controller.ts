import { Body, Controller, Delete, Get, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsServices } from '../services/products.service';
import { CreateProductsDto } from '../dto/create-product.dto';
import { UpdateProductsDto } from '../dto/update-product.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/modules/users/decorators/roles.decorators';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsServices) { }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FilesInterceptor('files', 3))
  @Post()
  async create(@Body() createProduct: CreateProductsDto,
    @CurrentUser() currentUser: User,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build(),
    ) files: Array<Express.Multer.File>,) {
    return await this.productsService.create(createProduct, currentUser, files)
  }

  @UseGuards(RolesGuard)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 3))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductsDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build(),
    )
    files: Array<Express.Multer.File>,
  ) {
    return await this.productsService.update(id, updateProduct, files);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }

}
