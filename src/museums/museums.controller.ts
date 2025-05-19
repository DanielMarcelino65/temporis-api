import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MuseumsService } from './museums.service';
import { CreateMuseumDto } from './dto/create-museum.dto';

@Controller('museums')
export class MuseumsController {
  constructor(private readonly service: MuseumsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMuseumDto) {
    return this.service.create(dto);
  }
}
