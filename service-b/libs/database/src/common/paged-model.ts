import { ApiProperty } from '@nestjs/swagger';
import { SortingDirection } from './sorting-direction';

export class PagedModel<T> {
  @ApiProperty()
  readonly pageNumber: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly itemsCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly orderBy: string | SortingDirection;

  @ApiProperty()
  readonly orderByPropertyName: string;

  @ApiProperty()
  items: T[];

  constructor({
    pageNumber,
    pageSize,
    orderBy,
    orderByPropertyName,
    itemsCount,
    items
  }: any) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.itemsCount = itemsCount;
    this.orderBy = orderBy;
    this.orderByPropertyName = orderByPropertyName;
    this.pageCount = Math.ceil(itemsCount / this.pageSize);
    this.items = items;
  }
}
