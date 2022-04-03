import {
  DeleteResult,
  FindConditions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
  DeepPartial,
} from 'typeorm';
import { IBaseService } from '../../../../domain/common/src/i.base.service';
import { PagedModel } from '../../../../domain/common/src/paged-model';
import { SortingDirection } from '../../../../domain/common/src/sorting-direction';

export class BaseService<TRepository extends Repository<TEntity>, TEntity>
  implements IBaseService<TEntity>
{
  constructor(protected readonly repository: TRepository) {}

  async hasMatching(
    fieldName: string,
    value: string,
    id?: string,
  ): Promise<boolean> {
    if (id) {
      return (
        (await this.createQueryBuilder('x')
          .andWhere(`x.${fieldName}=:fieldName`, { fieldName: value })
          .andWhere(`x.id!=:id`, { id: id })
          .getCount()) > 0
      );
    } else {
      return (
        (await this.createQueryBuilder('x')
          .andWhere(`x.${fieldName}=:fieldName`, { fieldName: value })
          .getCount()) > 0
      );
    }
  }

  async findById(id: string) :Promise<Partial<TEntity>>{
      return await this.repository.findOne(id);
  }

  async isExistsById(
    id: string,
  ): Promise<boolean> {

      const result = await this.repository.findOne(id);
      if (!result) return false;
      return true;
  }

  async paged(
    queryBuilder: SelectQueryBuilder<TEntity>,
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<PagedModel<TEntity>> {
    const [items, itemsCount] = await queryBuilder
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy(orderByPropertyName, orderBy)
      .getManyAndCount();

    const pagedResponse = new PagedModel<TEntity>({
      pageNumber,
      pageSize,
      orderBy,
      orderByPropertyName,
      itemsCount,
      items,
    });

    return pagedResponse;
  }

  async pagedRaw(
    queryBuilder: SelectQueryBuilder<TEntity>,
    pageNumber: number,
    pageSize: number,
    orderBy: SortingDirection,
    orderByPropertyName: string,
  ): Promise<PagedModel<any>> {
    const items = await queryBuilder
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .orderBy(orderByPropertyName, orderBy)
      .getRawMany();

    const itemsCount = await queryBuilder.getCount();

    const pagedResponse = new PagedModel<any>({
      pageNumber,
      pageSize,
      orderBy,
      orderByPropertyName,
      itemsCount,
      items,
    });

    return pagedResponse;
  }

  async insert(record: Partial<TEntity>): Promise<Partial<TEntity>> {
    const doc = this.repository.create(record as DeepPartial<TEntity>);
    return await this.repository.save(doc as DeepPartial<TEntity>);
  }

  async insertMany(records: Partial<TEntity>[]): Promise<Partial<TEntity>[]> {
    const docs = this.repository.create(records as DeepPartial<TEntity>[]);
    return await this.repository.save(docs as DeepPartial<TEntity>[]);
  }

  async updateById(
    id: number | string,
    record: TEntity,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, record as TEntity);
  }

  async updateMany(
    criteria: FindConditions<TEntity>,
    record: TEntity,
  ): Promise<UpdateResult> {
    return await this.repository.update(criteria, record as TEntity);
  }

  async deleteById(id: number | string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async deleteMany(criteria: FindConditions<TEntity>): Promise<DeleteResult> {
    return await this.repository.delete(criteria);
  }

  createQueryBuilder(alias = ''): SelectQueryBuilder<TEntity> {
    return this.repository.createQueryBuilder(alias);
  }
}
