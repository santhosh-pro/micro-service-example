import { SortingDirection } from '@app/common/sorting-direction';
import { AutoMap } from '@automapper/classes';
import { IQuery } from '@nestjs/cqrs';

export class GetCustomerListQuery implements IQuery{
  @AutoMap()
  orderBy: SortingDirection=SortingDirection.ASC;
  @AutoMap()
  orderByPropertyName: string='id';
  @AutoMap()
  pageNumber: number=1;
  @AutoMap()
  pageSize: number=50;
}
