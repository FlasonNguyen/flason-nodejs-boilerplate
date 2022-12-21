import { CreationAttributes, Attributes, CreateOptions, DestroyOptions, UpdateOptions, Optional } from 'sequelize';
import { IQueryOption } from '@/interfaces';
import { ModelCtor, Model } from 'sequelize-typescript';

export class CRUDService<T extends Model> {
  constructor(public model: ModelCtor<T>) {}

  // TODO - Replace throw Error with custom error
  async getItem(queryInfo?: IQueryOption): Promise<T | null> {
    return await this.model.findOne(queryInfo);
  }

  async getList(queryInfo?: IQueryOption): Promise<{ rows: T[]; count: number }> {
    return await this.model.findAndCountAll(queryInfo);
  }

  async create(params: CreationAttributes<T>, option?: CreateOptions): Promise<T> {
    return await this.model.create<T>(params, option);
  }

  async update(params: Attributes<T>, option?: UpdateOptions | IQueryOption) {
    return await this.model.update(params, option);
  }

  async delete(option?: DestroyOptions | IQueryOption): Promise<number | void> {
    return await this.model.destroy(option);
  }
}
