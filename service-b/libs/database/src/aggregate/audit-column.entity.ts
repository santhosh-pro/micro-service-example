import { AutoMap } from '@automapper/classes';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AuditColumn {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({default:'user'})
  createdBy!: string;

  @Column({default:'user'})
  updatedBy!: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdOn!: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  updatedOn!: Date;
}
