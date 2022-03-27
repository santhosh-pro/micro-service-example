import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { ignore, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCustomerRequest } from './create-customer-request';
@Injectable()
export class CreateCustomerMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper) => {
      mapper
        .createMap(CreateCustomerRequest, Customer)
        .forMember((destination) => destination.id, ignore());
    };
  }
}
