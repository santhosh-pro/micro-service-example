import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CustomerPagedModel } from "libs/domain/aggregate/src/customer/customer-paged-model";
import { ICustomerService } from "libs/domain/aggregate/src/customer/i.customer.service";
import { GetCustomerListQuery } from "libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query";
import { GetCustomerListQueryResult } from "libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query-result";

@QueryHandler(GetCustomerListQuery)
export class GetCustomerListQueryHandler implements IQueryHandler<GetCustomerListQuery, GetCustomerListQueryResult> {
    constructor(
        @Inject('ICustomerService')
        private readonly customerService: ICustomerService,
        @InjectMapper() private mapper: Mapper,
    ) {}
    async execute(query: GetCustomerListQuery): Promise<GetCustomerListQueryResult> {
        const result = await this.customerService.getCustomerList(
            query.pageNumber,
            query.pageSize,
            query.orderBy,
            query.orderByPropertyName,
          );
          const response = this.mapper.map(
            result,
            GetCustomerListQueryResult,
            CustomerPagedModel
          );
         return response;
    }

}
