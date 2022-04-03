import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IntegrationEvent } from '../integration-event';
import { OutboxEntity } from './entity/outbox.entity';
import { MessageStatus } from './message.model';

@Injectable()
export class MessageProcessor {
  private readonly _logger = new Logger(MessageProcessor.name);

  constructor(
    @InjectRepository(OutboxEntity)
    private readonly _outboxRepository: Repository<OutboxEntity>,
    private readonly _amqpConnection: AmqpConnection
  ) {
    this._logger.debug('Starting Message Processor');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processMessages() {
    this._logger.debug(`Job Running`);
    const messages = await this._outboxRepository.find({
      where: {
        status: In([MessageStatus.PENDING, MessageStatus.FAILED]),
      },
    });

    if (messages.length) {
      this._logger.debug(`Found ${messages.length} unpublished messages`);

      for (const message of messages) {
        const payload: IntegrationEvent = JSON.parse(message.payload);
        try {
          this._logger.debug(
            `Trying to send event: ${JSON.stringify(payload)} to Event bus`,
          );
      
          try {
            await this._amqpConnection.publish("exchange1", payload.topic, payload);
      
            this._logger.debug(
              `Event: ${JSON.stringify(payload)} was successfully sent to Event bus`,
            );
          } catch (error) {
            this._logger.error(
              `Event: ${JSON.stringify(payload)} was not sent due to error: ${error}`,
            );
      
            throw error;
          }
          this._logger.debug(
            `Deleting sent message from outbox with id ${payload.eventId}`,
          );
          await this._outboxRepository.delete(payload.eventId);
        } catch {
          await this._outboxRepository.update(payload.eventId, {
            status: MessageStatus.FAILED,
            updatedAt: new Date(),
          });
          this._logger.debug(
            `Message with id ${payload.eventId} status changed to '${MessageStatus.FAILED}'`,
          );
        }
      }
      }
    }
}