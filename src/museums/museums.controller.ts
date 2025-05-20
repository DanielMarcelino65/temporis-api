/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { MuseumsService } from './museums.service';
import { CreateMuseumDto } from './dto/create-museum.dto';
import { PassThrough } from 'stream';

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

  @Get(':id/visits/download')
  async getCsvFile(@Param('id') museumId: string): Promise<StreamableFile> {
    const visits = await this.service.getVisitsForMuseum(museumId);
    if (!visits.length)
      throw new NotFoundException('Nenhuma visita encontrada');
    const museumName = visits[0].museum.name.replace(/\s+/g, '_');
    const pass = new PassThrough();
    pass.write('Name,BirthPlace\n');
    for (const { user } of visits) {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      pass.write(`${escape(user.name)},${escape(user.birthPlace)}\n`);
    }
    pass.end();

    return new StreamableFile(pass, {
      type: 'text/csv',
      disposition: `attachment; filename="${museumName}_visits.csv"`,
    });
  }
}
