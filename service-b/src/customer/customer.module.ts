import { Module } from '@nestjs/common';
import { CustomerUseCasesModule } from './customer-use-cases/customer-use-cases.module';
@Module({
  imports: [CustomerUseCasesModule],
  controllers: [],
  providers: [],
})
export class CustomerModule {}
