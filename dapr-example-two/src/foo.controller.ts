import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Foo')
export class FooController {
  @Post('myapp-foo')
  foo(@Body() data: any) {
    console.log('foo', JSON.stringify(data));
  }

  @Post('bar')
  bar(@Body() data: any) {
    console.log('bar', data);
  }
}
