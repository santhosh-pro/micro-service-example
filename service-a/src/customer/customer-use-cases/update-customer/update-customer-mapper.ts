import { ignore, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UpdateCustomerRequest } from './update-customer-request';
import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';

@Injectable()
export class UpdateCustomerMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(UpdateCustomerRequest, Customer)
        .forMember((destination) => destination.id, ignore());
    };
  }
}
