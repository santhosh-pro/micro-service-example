import { CustomerPagedModel } from 'libs/domain/aggregate/src/customer/customer-paged-model';
import { IBaseService } from 'libs/domain/common/src/i.base.service';
import { SortingDirection } from 'libs/domain/common/src/sorting-direction';
import { Customer } from './customer';

export interface ICustomerService extends IBaseService<Customer> {
  getCustomerList(
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<CustomerPagedModel>;
}
