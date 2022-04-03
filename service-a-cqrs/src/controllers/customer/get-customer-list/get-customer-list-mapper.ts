import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GetCustomerBase } from '../get-customer-base';
import { GetCustomerListResponse } from './get-customer-list-response';
import { GetCustomerListQuery } from 'libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query';
import { GetCustomerListRequest } from './get-customer-list-request';
import { GetCustomerListQueryResult } from 'libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query-result';
import { Customer } from 'libs/domain/aggregate/src/customer/customer';

@Injectable()
export class GetCustomerListMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      //Request
      mapper.createMap(GetCustomerListRequest,GetCustomerListQuery);



      //Response
      mapper.createMap(Customer, GetCustomerBase);
      mapper.createMap(GetCustomerListQueryResult, GetCustomerListResponse);
    };
  }
}
