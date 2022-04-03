import { ignore, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCustomerCommand } from 'libs/domain/aggregate/src/customer/commands/create-customer/create-customer-command';
import { Customer } from 'libs/domain/aggregate/src/customer/customer';
@Injectable()
export class CreateCustomerCommandMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper) => {
      mapper
        .createMap(CreateCustomerCommand, Customer)
        .forMember((destination) => destination.id, ignore());
    };
  }
}