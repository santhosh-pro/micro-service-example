import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerRequest } from './create-customer-request';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'libs/domain/aggregate/src/customer/commands/create-customer/create-customer-command';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(
    readonly commandBus: CommandBus,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() request: CreateCustomerRequest): Promise<any> {
    const command = this.mapper.map(request, CreateCustomerCommand, CreateCustomerRequest);
    await this.commandBus.execute(command);
  }
}
