import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCustomerListRequest } from './get-customer-list-request';
import { GetCustomerListResponse } from './get-customer-list-response';
import { QueryBus } from '@nestjs/cqrs';
import { GetCustomerListQuery } from 'libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query';
import { GetCustomerListQueryResult } from 'libs/domain/aggregate/src/customer/queries/get-customer-list/get-customer-list-query-result';

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly queryBus: QueryBus,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Get()
  @HttpCode(200)
  async execute(
    @Query() request: GetCustomerListRequest,
  ): Promise<Partial<GetCustomerListResponse>> {
    const query = this.mapper.map(
      request,
      GetCustomerListQuery,
      GetCustomerListRequest,
    );
    const result= await this.queryBus.execute(query)

    const response = this.mapper.map(
      result,
      GetCustomerListResponse,
      GetCustomerListQueryResult,
    );
    return response;
  }
}
