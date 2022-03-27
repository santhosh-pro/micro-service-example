import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { SortingDirection } from './sorting-direction';
export class PagedResponse {
  @ApiProperty()
  @AutoMap()
  readonly pageNumber: number;

  @ApiProperty()
  @AutoMap()
  readonly pageSize: number;

  @ApiProperty()
  @AutoMap()
  readonly itemsCount: number;

  @ApiProperty()
  @AutoMap()
  readonly pageCount: number;

  @ApiProperty()
  @AutoMap()
  readonly orderBy: string | SortingDirection;

  @ApiProperty()
  @AutoMap()
  readonly orderByPropertyName: string;
}
