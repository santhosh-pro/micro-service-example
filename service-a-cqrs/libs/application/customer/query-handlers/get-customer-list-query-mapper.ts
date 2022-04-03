import { Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Customer } from "libs/domain/aggregate/src/customer/customer";
import { CustomerPagedModel } from "libs/domain/aggregate/src/customer/customer-paged-model";
import { GetCustomerListQueryResult } from "libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query-result";

@Injectable()
export class GetCustomerListQueryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(Customer, Customer);
      mapper.createMap(CustomerPagedModel, GetCustomerListQueryResult);
    };
  }
}