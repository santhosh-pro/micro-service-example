import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { ICustomerService } from '@app/database/aggregate/customer-aggregate/customer/i.customer.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCustomerResponse } from './get-customer-response';

@ApiTags('customers')
@Controller('customers')
export class GetCustomerController {
  constructor(
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Get(':id')
  @HttpCode(200)
  async execute(@Param('id') id: string): Promise<GetCustomerResponse> {
    const customer = await this.customerService.findById(id);
    if (!customer)
      throw new HttpException('Customer Not Found', HttpStatus.BAD_REQUEST);

    const response = this.mapper.map(customer, GetCustomerResponse, Customer);
    return response;
  }
}
