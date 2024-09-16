import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class  createDiscountDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    discountType: string;
  
    @IsNumber()
    @IsNotEmpty()
    discountAmount: number;
  
    @IsDate()
    expiredAt: Date;
  
    @IsDate()
    startAt: Date;
  
    @IsString()
    discountStatus: string;
  
    @IsNumber()
    adminId: number;
}