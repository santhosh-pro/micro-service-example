import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerBase {
  @ApiProperty()
  @AutoMap()
  name: string;
}
