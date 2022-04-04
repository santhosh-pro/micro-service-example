import { GenericExceptionFilter } from 'src/filters/generic-exception.filter';
import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { JwtStrategy } from './jwt.strategy';
import { RequestContextModule } from 'nestjs-request-context';
import { SeederModule } from '@app/database/seeder/seeder.module';
import { ConfigurationModule } from '@app/configuration';
import { DatabaseModule } from '@app/database';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CustomerModule } from './controllers/customer/customer.module';
import { LOGGER } from 'libs/domain/common/src/logger';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { DaprModule } from 'libs/infra/dapr/src';
import { FooController } from './controllers/foo.controller';

@Module({
  imports: [
    SeederModule,
    ConfigurationModule,
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true,
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    CqrsModule,
    RequestContextModule,
    CustomerModule,
    DaprModule,
    DaprModule.subscribe('foo'),
  ],
  controllers: [AppController,FooController],
  providers: [
    {
      provide: LOGGER,
      useClass: Logger,
    },
    {
      provide: APP_FILTER,
      useClass: GenericExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
