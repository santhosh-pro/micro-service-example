import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { ICustomerService } from '@app/database/aggregate/customer-aggregate/customer/i.customer.service';
import { IOutboxRepository } from '@app/database/event-bus/cap/i.outbox.repository';
import { CustomerCreatedEvent } from '@app/database/event-bus/customer-created.event';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerRequest } from './create-customer-request';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @InjectMapper() private mapper: Mapper,
    @Inject('IOutboxRepository')
    private readonly _outboxRepository: IOutboxRepository,
  ) {}

  @Post()
  @HttpCode(201)
  async execute(@Body() request: CreateCustomerRequest): Promise<any> {
    const customer = this.mapper.map(request, Customer, CreateCustomerRequest);
    const result = await this.customerService.insert(customer);
    const customerCreatedEvent = new CustomerCreatedEvent(
      result.id,
      result.name,
    );
    await this._outboxRepository.create({
      id: customerCreatedEvent.eventId,
      topic:customerCreatedEvent.topic,
      payload: JSON.stringify(customerCreatedEvent),
    });
    return { id: result.id };
  }
}
