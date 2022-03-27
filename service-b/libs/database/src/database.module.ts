import { ConfigurationModule } from '@app/configuration';
import { Module } from '@nestjs/common';
import { AllEntitiesSubscriber } from './all-entities-subscriber';
import { dataBaseProvider } from './database.service';
import providers from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    dataBaseProvider,
    ConfigurationModule,
    TypeOrmModule.forFeature([...entities]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://guest:guest@localhost:5672',
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  providers: [...providers, AllEntitiesSubscriber],
  exports: [...providers, dataBaseProvider,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://guest:guest@localhost:5672',
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      connectionInitOptions: {
        wait: false,
      },
    }),],
})
export class DatabaseModule {}
