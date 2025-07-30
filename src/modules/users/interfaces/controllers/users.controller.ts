import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';

import { CreateUsersUseCase } from '../../application/use-case/create-users.use-case';
import { GetUsersUseCase } from '../../application/use-case/get-users.use-case';
import { UpdateUserCase } from '../../application/use-case/update-product.use-case';
import { SoftDeletedUserUseCase } from '../../application/use-case/soft-deleted-user.use-case';

import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUsersUseCase: CreateUsersUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
        private readonly updateUserUseCase: UpdateUserCase,
        private readonly softDeletedUserUseCase: SoftDeletedUserUseCase,
    ) {}

    @Post()
    async create(@Body() data: CreateUserDto) {
        return this.createUsersUseCase.createUser(data);
    }

    @Get()
    async findAll() {
        return this.getUsersUseCase.getAllUsers();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.getUsersUseCase.getuserById(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateUserDto,
    ) {
        return this.updateUserUseCase.updateUser(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.softDeletedUserUseCase.softDeletedUser(id);
    }
}
