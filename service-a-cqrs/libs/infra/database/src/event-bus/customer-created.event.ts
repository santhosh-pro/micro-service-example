import { IntegrationEvent } from "./integration-event";

export class CustomerCreatedEvent extends IntegrationEvent {
  public readonly topic = CustomerCreatedEvent.name;

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {
    super();
  }
}