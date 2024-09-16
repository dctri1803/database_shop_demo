import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductsDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
  
    @IsString()
    @IsOptional()
    description: string;
  
    @IsNumber()
    @IsPositive()
    @IsOptional()
    quantity: number;
  
    @IsNumber()
    @IsOptional()
    quantitySold: number;
  
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number;
  
    @IsNumber()
    @IsOptional()
    userId: number;
}