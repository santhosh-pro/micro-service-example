import { AutoMap } from '@automapper/classes';
import { IntegrationEvent } from './integration-event';

export class CustomerCreatedEvent {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  eventId: string;
  topic: string;
}
