import {
  DeleteResult,
  FindConditions,
  FindOneOptions,
  SelectQueryBuilder,
  UpdateResult,
  DeepPartial,
} from 'typeorm';
import { PagedModel } from './paged-model';
import { SortingDirection } from './sorting-direction';

export interface IBaseService<T> {
  findById(id: number | string, options?: FindOneOptions<T>): Promise<T>;
  findOne(options?: FindOneOptions<T> | FindConditions<T>): Promise<T>;
  findAll(options?: FindOneOptions<T> | FindConditions<T>): Promise<T[]>;
  hasMatching(fieldName: string, value: string, id?: string): Promise<boolean>;
  isExistsById(
    id: number | string,
    options?: FindOneOptions<T>,
  ): Promise<boolean>;
  paged(
    queryBuilder: SelectQueryBuilder<T>,
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<PagedModel<T>>;
  pagedRaw(
    queryBuilder: SelectQueryBuilder<T>,
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<PagedModel<any>>;
  insert(record: DeepPartial<T>): Promise<T>;
  insertMany(records: DeepPartial<T>[]): Promise<T[]>;
  updateById(id: number | string, record: Partial<T>): Promise<UpdateResult>;
  updateMany(
    criteria: FindConditions<T>,
    record: Partial<T>,
  ): Promise<UpdateResult>;
  deleteById(id: number | string): Promise<DeleteResult>;
  deleteMany(criteria: FindConditions<T>): Promise<DeleteResult>;
  createQueryBuilder(alias: string): SelectQueryBuilder<T>;
}
