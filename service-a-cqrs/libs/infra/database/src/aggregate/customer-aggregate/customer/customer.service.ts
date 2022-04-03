import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerService } from '../../../../../../domain/aggregate/src/customer/i.customer.service';
import { CustomerPagedModel } from '../../../../../../domain/aggregate/src/customer/customer-paged-model';
import { Customer} from './customer.entity';
import { SortingDirection } from 'libs/domain/common/src/sorting-direction';
import { BaseService } from '@app/database/common/base.service';

export class CustomerService
  extends BaseService<Repository<Customer>, Customer>
  implements ICustomerService
{
  constructor(
    @InjectRepository(Customer)
    protected readonly repository: Repository<Customer>,
  ) {
    super(repository);
  }

  public async getCustomerList(
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<CustomerPagedModel> {
    const queryBuilder = this.createQueryBuilder('p');

    const result = await this.paged(
      queryBuilder,
      pageNumber,
      pageSize,
      orderBy,
      orderByPropertyName,
    );
    return result;
  }
}
