import { PagedResponse } from '@app/database/common/paged-response';
import { AutoMap } from '@automapper/classes';
import { Customer } from './customer';

export class CustomerPagedModel extends PagedResponse {
  @AutoMap({ typeFn: () => Customer })
  items: Partial<Customer>[];
}
