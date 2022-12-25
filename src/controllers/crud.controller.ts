import { BaseController } from '@controllers/base.controller';
import { CRUDService } from '@services/crud.service';
import { IQueryOption } from '@/interfaces';

export class CRUDController<T extends CRUDService<any>> extends BaseController {
  constructor(service: T) {
    super();
    this.service = service;
  }

  service: T;

  async getList(option?: IQueryOption) {
    return await this.service.getList(option);
  }

  async getItem(option?: IQueryOption) {
    return await this.service.getItem(option);
  }

  async create(params: any, option?: IQueryOption) {
    return await this.service.create(params, option);
  }

  async update(params: any, option?: IQueryOption) {
    return await this.service.update(params, option);
  }

  async delete(option?: IQueryOption) {
    return await this.service.delete(option);
  }
}
