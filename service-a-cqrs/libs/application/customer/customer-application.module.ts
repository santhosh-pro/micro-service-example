import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { CreateCustomerCommandHandler } from './command-handlers/create-customer-handler';
import { CreateCustomerCommandMapper } from './command-handlers/create-customer-mapper';
import { GetCustomerListQueryHandler } from './query-handlers/get-customer-list-query-handler';
import { GetCustomerListQueryMapper } from './query-handlers/get-customer-list-query-mapper';
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateCustomerCommandMapper,
    CreateCustomerCommandHandler,
    GetCustomerListQueryHandler,
    GetCustomerListQueryMapper,
  ],
})
export class CustomerApplicationModule {}
