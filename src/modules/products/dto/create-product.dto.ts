import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductsDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    description: string;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;
  
    @IsNumber()
    @IsOptional()
    quantitySold: number;
  
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(0)
    price: number;
  
}