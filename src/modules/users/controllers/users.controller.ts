import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthServices } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService,
    private authService: AuthServices
  ) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return await this.usersService.create(createUser);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body)
  }

  @Post('sign-in')
  async signIn(@Body() body:SignInDto,
              @Session() session:Record<string, any>,
  ){
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return `Login successfully`
  }
}
