import { AutoMap } from '@automapper/classes';
import { CustomerBase } from './customer-base';

export class GetCustomerBase extends CustomerBase {
  @AutoMap()
  id: string;
}
