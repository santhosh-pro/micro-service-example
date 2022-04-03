/* PLOP_INJECT_IMPORT */

import { Customer } from './aggregate/customer-aggregate/customer/customer.entity';
import { InboxEntity } from './event-bus/cap/entity/inbox.entity';
import { OutboxEntity } from './event-bus/cap/entity/outbox.entity';

export default [
  /* PLOP_INJECT_ENTITY */
  Customer,
  OutboxEntity,
  InboxEntity
];
