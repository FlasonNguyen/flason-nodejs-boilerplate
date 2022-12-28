import { BaseController } from '@controllers/base.controller';
import { CRUDService } from '@services/crud.service';
import { IQueryOption } from '@/interfaces';

export class CRUDController<T extends CRUDService<any>> extends BaseController {
  constructor(service: T) {
    super();
    this.service = service;
  }

  service: T;

  public async getList(queryOption?: IQueryOption): Promise<{ rows: T[]; count: number }> {
    return await this.service.getList(queryOption);
  }

  public async getItem(queryOption?: IQueryOption): Promise<T | null> {
    return await this.service.getItem(queryOption);
  }

  public async create(productData: any, queryOption?: IQueryOption): Promise<T> {
    return await this.service.create(productData, queryOption);
  }

  public async update(productData: any, queryOption?: IQueryOption): Promise<[number, T[]]> {
    return await this.service.update(productData, queryOption);
  }
}
