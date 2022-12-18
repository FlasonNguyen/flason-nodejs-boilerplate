import config from '@config';
import { logger } from '@utils';
import { UserDto } from '@dtos';
import { CreationAttributes, Attributes, CreateOptions, DestroyOptions, UpdateOptions, Model as SModel, QueryOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import { IQueryOption } from '@interfaces';

export class CrudService<T extends Model<T>> {
  constructor(private model: ModelCtor<T>) {}

  // TODO - Replace throw Error with custom error

  async getItem(queryInfo?: IQueryOption): Promise<T> {
    return await this.model.findOne<T>(queryInfo);
  }

  async getList(queryInfo?: IQueryOption): Promise<{ rows: T[]; count: number }> {
    return await this.model.findAndCountAll<T>(queryInfo);
  }

  async create(params: CreationAttributes<T>, option?: CreateOptions): Promise<T> {
    return await this.model.create(params, option);
  }

  async update(params: Attributes<T>, option?: UpdateOptions | IQueryOption): Promise<[affectedCount: number, affectedRows: T[]] | [affectedCount: number]> {
    return await this.model.update(params, option);
  }
  async delete(option?: DestroyOptions | IQueryOption): Promise<number | void> {
    return await this.model.destroy(option);
  }
}
