import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprModule } from './dapr';
import { FooController } from './foo.controller';

@Module({
  imports: [
    DaprModule,
    DaprModule.subscribe('myapp-foo'),
  ],
  controllers: [AppController,FooController],
  providers: [AppService],
})
export class AppModule {}
