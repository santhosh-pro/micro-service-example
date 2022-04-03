import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortingDirection } from './sorting-direction';

export class PagingParams {
  @ApiPropertyOptional({
    enum: SortingDirection,
    default: SortingDirection.ASC
  })
  @IsEnum(SortingDirection)
  @IsOptional()
  @AutoMap()
  readonly orderBy: SortingDirection = SortingDirection.ASC;

  @ApiPropertyOptional()
  @AutoMap()
  readonly orderByPropertyName: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @AutoMap()
  readonly pageNumber: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 200,
    default: 50
  })
  @Type(() => Number)
  @IsInt()
  @Max(200)
  @IsOptional()
  @AutoMap()
  readonly pageSize: number = 200;
}
