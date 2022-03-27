import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { ICustomerService } from '@app/database/aggregate/customer-aggregate/customer/i.customer.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerRequest } from './update-customer-request';

@ApiTags('customers')
@Controller('customers')
export class UpdateCustomerController {
  constructor(
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Put(':id')
  @HttpCode(204)
  async execute(
    @Param('id') id: string,
    @Body() request: UpdateCustomerRequest,
  ): Promise<void> {
    const isExists = await this.customerService.isExistsById(id);
    if (!isExists)
      throw new HttpException('Customer Not Found', HttpStatus.BAD_REQUEST);

    const customer = this.mapper.map(request, Customer, UpdateCustomerRequest);
    customer.setId(id);
    await this.customerService.updateById(id, customer);
  }
}
