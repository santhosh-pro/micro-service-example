import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DaprService } from './dapr';

@Controller()
export class AppController {
  constructor(private readonly daprService: DaprService) {}

  @Get()
  async message(): Promise<void> {
    await this.daprService.publish('myapp-foo', { name: 'Santhosh' });
  }

  @Get('call')
  async call(): Promise<void> {
    await this.daprService.invokePost<void>("myapp2","bar", { name: 'bar test' });
  }
}
