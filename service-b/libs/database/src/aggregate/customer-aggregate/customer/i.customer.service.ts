import { IBaseService } from '@app/database/common/i.base.service';
import { SortingDirection } from '@app/database/common/sorting-direction';
import { CustomerPagedModel } from './customer-paged-model';
import { Customer } from './customer.entity';

export interface ICustomerService extends IBaseService<Customer> {
  getCustomerList(
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<CustomerPagedModel>;
}
