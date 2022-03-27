import { Message } from "./message.model";

export interface IOutboxRepository {
    create(message: Message): Promise<void>;
    update(id: string, message: Partial<Message>): Promise<void>;
    delete(id: string): Promise<void>;
  }
  
