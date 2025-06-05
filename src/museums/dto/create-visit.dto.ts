/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsUUID } from 'class-validator';

export class CreateVisitDto {
  @IsUUID()
  museumId: string;
  @IsString()
  name: string;
  @IsString()
  birthPlace: string;
}
