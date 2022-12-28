import { CreationAttributes, DestroyOptions, UpdateOptions } from 'sequelize';
import { IQueryOption } from '@/interfaces';
import { ModelCtor, Model } from 'sequelize-typescript';
import { sequelize } from '@/models';

export class CRUDService<T extends Model> {
  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  protected readonly model: ModelCtor<T>;

  async transaction() {
    return await sequelize.transaction();
  }

  // TODO - Replace throw Error with custom error
  async getItem(queryInfo?: IQueryOption): Promise<T | null> {
    return await this.model.findOne(queryInfo);
  }

  async getList(queryInfo?: IQueryOption): Promise<{ rows: T[]; count: number }> {
    return await this.model.findAndCountAll(queryInfo);
  }

  async create(params: CreationAttributes<T>, option?: IQueryOption): Promise<T> {
    return await this.model.create(params, option);
  }

  async update(params: CreationAttributes<T>, option?: UpdateOptions | IQueryOption): Promise<[number, T[]]> {
    return await this.model.update(params, { ...option, returning: true });
  }

  async delete(option?: DestroyOptions | IQueryOption): Promise<number | void> {
    return await this.model.destroy(option);
  }
}
