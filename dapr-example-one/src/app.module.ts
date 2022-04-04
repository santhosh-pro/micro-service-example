import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprModule } from './dapr';
@Module({
  imports: [
    DaprModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
