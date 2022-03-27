export interface IInboxRepository {
    create(messageId: string): Promise<void>;
    exists(messageId: string): Promise<boolean>;
    delete(messageId: string): Promise<void>;
  }
