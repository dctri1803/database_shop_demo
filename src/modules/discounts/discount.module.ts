import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Discount } from "src/database/entities/discount.entity";
import { DiscountsController } from "./controllers/discounts.controller";
import { DiscountsServices } from "./services/discounts.service";

@Module({
    imports: [TypeOrmModule.forFeature([Discount])],
    controllers: [DiscountsController],
    providers: [DiscountsServices]
})

export class DiscountModule {}