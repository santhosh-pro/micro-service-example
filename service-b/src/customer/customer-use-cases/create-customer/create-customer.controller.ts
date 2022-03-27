import { Customer } from '@app/database/aggregate/customer-aggregate/customer/customer.entity';
import { ICustomerService } from '@app/database/aggregate/customer-aggregate/customer/i.customer.service';
import { IInboxRepository } from '@app/database/event-bus/cap/i.inbox.repository';
import { CustomerCreatedEvent } from '@app/database/event-bus/customer-created.event';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { CreateCustomerRequest } from './create-customer-request';

export class CreateCustomerConsumer {
  constructor(
    @Inject('ICustomerService')
    private readonly customerService: ICustomerService,
    @InjectMapper() private mapper: Mapper,
    @Inject('IInboxRepository')
    private readonly _inboxRepository: IInboxRepository,
  ) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: CustomerCreatedEvent.name,
  })
  async execute(event: CustomerCreatedEvent): Promise<any> {
    const processed = await this._inboxRepository.exists(event.eventId);
    if (processed) {
      return;
    }
    try {
      const customer = this.mapper.map(event, Customer, CustomerCreatedEvent);
      await this.customerService.insert(customer);

      await this._inboxRepository.create(event.eventId);
    } catch (error) {
      console.log(`-- Updating product price failed. Error: ${error}`);

      return new Nack(true);
    }
  }
}
