import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutboxEntity } from './entity/outbox.entity';
import { IOutboxRepository } from './i.outbox.repository';
import { Message } from './message.model';

export class OutboxRepository implements IOutboxRepository {
  constructor(
    @InjectRepository(OutboxEntity)
    private readonly _outboxRepository: Repository<OutboxEntity>
  ) {}

  async create(message: Message): Promise<void> {
    const createdMessage = this._outboxRepository.create(message);

    await this._outboxRepository.insert(createdMessage);
  }

  async update(id: string, message: Partial<Message>): Promise<void> {
    await this._outboxRepository.update(id, message);
  }

  async delete(id: string): Promise<void> {
    await this._outboxRepository.delete(id);
  }
}