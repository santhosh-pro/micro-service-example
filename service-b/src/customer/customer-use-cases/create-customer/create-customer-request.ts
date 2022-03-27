import { AutoMap } from '@automapper/classes';
import { CustomerBase } from '../customer-base';

export class CreateCustomerRequest extends CustomerBase {
  @AutoMap()
  id: string;
}
