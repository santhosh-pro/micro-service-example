import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MessageStatus } from '../message.model';

@Entity({ name: 'outbox' })
export class OutboxEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  topic: string;

  @Column()
  payload: string;

  @Column({ default: MessageStatus.PENDING })
  status: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  updatedAt: Date;
}