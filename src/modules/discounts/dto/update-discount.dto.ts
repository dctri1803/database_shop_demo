import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class  updateDiscountDto {
    @IsString()
    @IsOptional()
    name: string;
  
    @IsString()
    @IsOptional()
    discountType: string;
  
    @IsNumber()
    @IsOptional()
    discountAmount: number;
  
    @IsDate()
    @IsOptional()
    expiredAt: Date;
  
    @IsDate()
    @IsOptional()
    startAt: Date;
  
    @IsString()
    @IsOptional()
    discountStatus: string;
  
    @IsNumber()
    @IsOptional()
    adminId: number;
}