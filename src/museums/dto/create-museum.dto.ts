/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateMuseumDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsInt()
  @Min(1)
  phaseNumber!: number;
}
