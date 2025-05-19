import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMuseumDto } from './dto/create-museum.dto';

@Injectable()
export class MuseumsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.museum.findMany({ orderBy: { phaseNumber: 'asc' } });
  }

  async findOne(id: string) {
    const museum = await this.prisma.museum.findUnique({ where: { id } });
    if (!museum) throw new NotFoundException('Museu não encontrado');
    return museum;
  }

  async create(dto: CreateMuseumDto) {
    try {
      return await this.prisma.museum.create({ data: dto });
    } catch {
      throw new BadRequestException('Falha ao criar museu');
    }
  }
}
