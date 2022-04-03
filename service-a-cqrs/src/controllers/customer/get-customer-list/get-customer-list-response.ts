import { PagedResponse } from '@app/database/common/paged-response';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetCustomerBase } from '../get-customer-base';

export class GetCustomerListResponse extends PagedResponse {
  @AutoMap({ typeFn: () => GetCustomerBase })
  items: GetCustomerBase[];
}
