import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}
    @Get()
    getAll() {
        return this.userService.getAllusers();
    }
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getuserById(id);
    }
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createuser(createUserDto);
    }
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
        return this.userService.updateUser(id, body);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
