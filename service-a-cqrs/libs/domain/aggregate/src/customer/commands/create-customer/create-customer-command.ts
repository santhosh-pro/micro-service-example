import { AutoMap } from '@automapper/classes';
import { ICommand } from '@nestjs/cqrs';

export class CreateCustomerCommand implements ICommand {
   @AutoMap()
   name: string;
}
