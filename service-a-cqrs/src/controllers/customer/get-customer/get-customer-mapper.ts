import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetCustomerResponse } from './get-customer-response';

@Injectable()
export class GetCustomerMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Customer, GetCustomerResponse);
    };
  }
}
