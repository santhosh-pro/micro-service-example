import { randomUUID } from 'crypto';

export abstract class IntegrationEvent {
  public readonly eventId = randomUUID();
  public readonly creationDate = new Date().toUTCString();
  public abstract readonly topic: string;
}