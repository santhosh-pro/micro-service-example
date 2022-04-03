import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'libs/domain/aggregate/src/customer/commands/create-customer/create-customer-command';
import { CreateCustomerCommandResult } from 'libs/domain/aggregate/src/customer/commands/create-customer/create-customer-command-result';
import { Customer } from 'libs/domain/aggregate/src/customer/customer';
import { ICustomerService } from 'libs/domain/aggregate/src/customer/i.customer.service';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand, void>
{
  constructor(
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<void> {
    const customer = this.mapper.map(command, Customer, CreateCustomerCommand);
    const result = await this.customerService.insert(customer);
    const response:CreateCustomerCommandResult= {
      id:result.id
    }
  }
}