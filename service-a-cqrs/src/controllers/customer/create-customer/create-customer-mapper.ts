import { MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateCustomerRequest } from './create-customer-request';
import { CreateCustomerCommand } from 'libs/domain/aggregate/src/customer/commands/create-customer/create-customer-command';
@Injectable()
export class CreateCustomerMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper) => {
      mapper
        .createMap(CreateCustomerRequest,CreateCustomerCommand)
    };
  }
}
