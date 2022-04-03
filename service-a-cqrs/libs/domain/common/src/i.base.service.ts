export interface IBaseService<T> {
  findById(id: string): Promise<Partial<T>>;
  hasMatching(fieldName: string, value: string, id?: string): Promise<boolean>;
  isExistsById(
    id: string,
  ): Promise<boolean>;
  insert(record: Partial<T>): Promise<Partial<T>>;
  insertMany(records: Partial<T>[]): Promise<Partial<T>[]>;
  updateById(id: number | string, record: Partial<Partial<T>>): Promise<any>;
  deleteById(id: number | string): Promise<any>;
}
