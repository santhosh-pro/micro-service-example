import { CustomerPagedModel } from '@app/database/aggregate/customer-aggregate/customer/customer-paged-model';
import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetCustomerBase } from '../get-customer-base';
import { GetCustomerListResponse } from './get-customer-list-response';

@Injectable()
export class GetCustomerListMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Customer, GetCustomerBase);

      mapper.createMap(CustomerPagedModel, GetCustomerListResponse);
    };
  }
}
