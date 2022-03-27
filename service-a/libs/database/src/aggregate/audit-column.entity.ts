import { AutoMap } from '@automapper/classes';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AuditColumn {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  createdBy!: string;

  @Column()
  updatedBy!: string;

  @Column()
  createdOn!: Date;

  @Column()
  updatedOn!: Date;
}
