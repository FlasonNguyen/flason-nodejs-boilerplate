import { ProductDto } from '@models/dtos';
import { CRUDController } from '@controllers/crud.controller';
import { ProductsService } from '@/services';

export class ProductsController extends CRUDController<ProductsService> {
  constructor() {
    super(new ProductsService());
  }

  async findProductById(productID: string): Promise<ProductDto> {
    return await this.service.findProductById(productID);
  }

  async createProduct(params: ProductDto): Promise<ProductDto> {
    return await this.service.createProduct(params);
  }

  async updateProduct(productID: string, params: ProductDto): Promise<ProductDto> {
    return await this.service.updateProduct(productID, params);
  }

  async deleteProduct(productID: string): Promise<ProductDto> {
    return await this.service.deleteProduct(productID);
  }
}
