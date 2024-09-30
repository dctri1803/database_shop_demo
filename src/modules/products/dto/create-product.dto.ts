import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductsDto {

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    description: string;
    
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    quantitySold: number;

    @ApiProperty({
        type: Number,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(0)
    price: number;
  
}