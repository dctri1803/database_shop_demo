import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { DiscountsServices } from "../services/discounts.service";
import { createDiscountDto } from "../dto/create-discount.dto";
import { updateDiscountDto } from "../dto/update-discount.dto";

@Controller('discounts')
export class DiscountsController {
    constructor (private discountsServices: DiscountsServices) {}
    @Get()
    async findAll() {
        return await this.discountsServices.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.discountsServices.findOne(id)
    }

    @Post()
    async create(@Body() createDiscount: createDiscountDto) {
        return await this.discountsServices.create(createDiscount)
    }

    @Patch()
    async update(@Param('id', ParseIntPipe) id: number,
    @Body() updateDiscount: updateDiscountDto) {
    return await this.discountsServices.update(id, updateDiscount)
}
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.discountsServices.delete(id)
    }
}