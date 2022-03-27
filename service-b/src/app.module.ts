import { GenericExceptionFilter } from '@app/common/filters/generic-exception.filter';
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
import { CustomerModule } from './customer/customer.module';
import { LOGGER } from '@app/common/logger';
import { ScheduleModule } from '@nestjs/schedule';

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
    
    RequestContextModule,
    CustomerModule,
  ],
  controllers: [AppController],
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
