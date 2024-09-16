import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Discount } from "src/database/entities/discount.entity";
import { Repository } from "typeorm";
import { createDiscountDto } from "../dto/create-discount.dto";
import { updateDiscountDto } from "../dto/update-discount.dto";

@Injectable()
export class DiscountsServices {
    constructor(
        @InjectRepository(Discount)
        private discountsRepository: Repository <Discount>
    ) {}

    findAll(): Promise<Discount[]> {
        return this.discountsRepository.find()
    }

    findOne(id: number): Promise<Discount> {
        return this.discountsRepository.findOneBy(
            {id: id}
        )
    }

    async create(createDiscount: createDiscountDto): Promise<Discount> {
        const createdDiscount = this.discountsRepository.create(createDiscount)
        return await this.discountsRepository.save(createdDiscount)
    }

    async update(id: number, updateDiscount: updateDiscountDto): Promise<Discount> {
        await this.discountsRepository.update({id: id}, updateDiscount)
        return this.discountsRepository.findOneBy({id: id})
    }

    async delete(id: number): Promise<string> {
        await this.discountsRepository.delete({id: id})
        return `Delete discount with id: ${id} successfully`;
    }
}