import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';
import { AuditColumn } from '../../audit-column.entity';

@Entity()
export class Customer extends AuditColumn {
  public setId(id: string) {
    this.id = id;
  }

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
}
