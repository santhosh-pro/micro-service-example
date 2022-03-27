import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { Seeder } from './seeder';

/* PLOP_INJECT_IMPORT */

@Module({
  imports: [
    DatabaseModule,
    /* PLOP_INJECT_MODULE */
  ],
  controllers: [],
  providers: [Seeder],
})
export class SeederModule {}
