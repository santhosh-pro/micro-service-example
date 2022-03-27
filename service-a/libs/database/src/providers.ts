/* PLOP_INJECT_IMPORT */

import { CustomerService } from './aggregate/customer-aggregate/customer/customer.service';
import { InboxRepository } from './event-bus/cap/inbox.repository';
import { MessageProcessor } from './event-bus/cap/message.processor';
import { OutboxRepository } from './event-bus/cap/outbox.repository';

export default [
  MessageProcessor,
   /* PLOP_EXPORT_MODULE */
  {
    provide: 'ICustomerService',
    useClass: CustomerService,
  },
  {
    provide: 'IOutboxRepository',
    useClass: OutboxRepository,
  },
  {
    provide: 'IInboxRepository',
    useClass: InboxRepository,
  },
];
