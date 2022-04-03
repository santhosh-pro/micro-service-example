import { AutoMap } from "@automapper/classes";
import { AggregateRoot } from "@nestjs/cqrs";

export class Customer extends AggregateRoot {
  @AutoMap()
  id!: string;

  @AutoMap()
  name: string;
}
