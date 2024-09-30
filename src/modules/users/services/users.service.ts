import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(paginationDto : PaginationDto) {
    const {offset, limit } = paginationDto;
    return this.usersRepository
      .createQueryBuilder('user')
      .take(limit)
      .skip(offset)
      .getManyAndCount()
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, body: UpdateUserDto) {
    await this.usersRepository.save({
      id,
      ...body,
    });
  }

  async create(createUser: CreateUserDto) {
    const user = this.usersRepository.create(createUser);
    return await this.usersRepository.save(user);
  }

  async delete(id: number) {
    await this.usersRepository.delete({ id: id });
    return `Deleted user with id ${id}`;
  }

}
