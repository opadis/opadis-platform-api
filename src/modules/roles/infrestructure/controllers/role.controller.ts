import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRoleUseCase } from '../../application/use-case/create-role.use-case';
import { UpdateRoleUseCase } from '../../application/use-case/update-role.use-case';
import { SoftDeletedRoleUseCase } from '../../application/use-case/soft-deleted-role.use-case';
import { GetRoleUseCase } from '../../application/use-case/get-role.use-case';
import { CreateRoleDto } from '../../application/dtos/create-role.dto';
import { UpdateRoleDto } from '../../application/dtos/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly softDeleteRoleUseCase: SoftDeletedRoleUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,
  ) {}

  @Get()
  async getAllRoles() {
    return this.getRoleUseCase.getAllRoles();
  }

  // Aquí usamos ParseIntPipe para convertir y validar el id automáticamente
  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.getRoleUseCase.getRoleById(id);
  }

  @Get('name/:name')
  async getRoleByName(@Param('name') name: string) {
    return this.getRoleUseCase.getRoleByName(name);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.createRoleUseCase.createRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.updateRoleUseCase.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async softDeleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.softDeleteRoleUseCase.softDeleteRole(id);
  }
}
