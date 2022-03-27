import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CustomerCreatedEvent } from '@app/database/event-bus/customer-created.event';
@Injectable()
export class CreateCustomerMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper) => {
      mapper
        .createMap(CustomerCreatedEvent, Customer);
    };
  }
}
