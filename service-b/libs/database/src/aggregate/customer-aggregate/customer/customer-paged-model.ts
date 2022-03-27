import { PagedResponse } from '@app/database/common/paged-response';
import { AutoMap } from '@automapper/classes';
import { Customer } from './customer.entity';

export class CustomerPagedModel extends PagedResponse {
  @AutoMap({ typeFn: () => Customer })
  items: Customer[];
}
