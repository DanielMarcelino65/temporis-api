import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitDto } from '../museums/dto/create-visit.dto';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVisitDto) {
    try {
      return await this.prisma.visit.create({
        data: {
          museumId: dto.museumId,
          name: dto.name,
          birthPlace: dto.birthPlace,
        },
      });
    } catch {
      throw new BadRequestException(
        'Já há registro de visita ou dados inválidos',
      );
    }
  }

  async findByUser(userId: string) {
    return await this.prisma.visit.findMany({
      where: { userId },
      include: { museum: true },
      orderBy: { visitedAt: 'desc' },
    });
  }

  // async exists(userId: string, museumId: string) {
  //   const v = await this.prisma.visit.findUnique({
  //     where: { userId_museumId: { userId, museumId } },
  //   });
  //   return { visited: !!v };
  // }

  // async remove(userId: string, museumId: string) {
  //   try {
  //     await this.prisma.visit.delete({
  //       where: { userId_museumId: { userId, museumId } },
  //     });
  //   } catch {
  //     throw new NotFoundException('Registro de visita não encontrado');
  //   }
  // }
}
