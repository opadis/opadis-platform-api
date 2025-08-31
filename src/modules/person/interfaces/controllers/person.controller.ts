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
import { CreatePersonUseCase } from '../../aplication/use-case/create-person.use-case';
import { getPersonUseCase } from '../../aplication/use-case/get-person,use-case';
import { UpdatePersonUseCase } from '../../aplication/use-case/update-person.use-case';
import { SoftDeletedPersonUseCase } from '../../aplication/use-case/soft-deleted-person.use-case';

import { CreatePersonDto } from '../../aplication/dtos/create-person.dto';
import { UpdatePersonDto } from '../../aplication/dtos/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(
    private readonly createPersonUseCase: CreatePersonUseCase,
    private readonly getPersonUseCase: getPersonUseCase,
    private readonly updatePersonUseCase: UpdatePersonUseCase,
    private readonly softDeletedPersonUseCase: SoftDeletedPersonUseCase,
  ) {}
  @Post()
  async create(@Body() data: CreatePersonDto) {
    return this.createPersonUseCase.createPerson(data);
  }
  @Get()
  async findAll() {
    return this.getPersonUseCase.getAllPerson();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getPersonUseCase.getByIdPerson(id);
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePersonDto,
  ) {
    return this.updatePersonUseCase.updatePerson(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.softDeletedPersonUseCase.softDeletedPerson(id);
  }
}
