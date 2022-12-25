import { ProductEntity } from '@/models';
import { ProductDto } from '@/models/dtos';
import { AppException } from '@/common/exceptions';
import { CRUDService } from '@services/crud.service';

export class ProductsService extends CRUDService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  public async findProductById(productID: string): Promise<ProductDto> {
    if (!productID) throw new AppException(400, 'ProductID is empty');
    return await this.model.findByPk(productID);
  }

  public async createProduct(params: ProductDto): Promise<ProductDto> {
    if (!params) throw new AppException(400, 'Product data is empty');
    return await this.model.create(params);
  }

  public async updateProduct(productID: string, params: ProductDto): Promise<ProductDto> {
    if (!params) throw new AppException(400, 'Product data is empty');
    const product = await this.model.findByPk(productID);
    if (!product) throw new AppException(409, "Product doesn't exist");
    await this.model.update(params, { where: { id: productID } });
    return await this.model.findByPk(productID);
  }

  public async deleteProduct(productID: string): Promise<ProductDto> {
    if (!productID) throw new AppException(400, 'ProductID is empty');
    const product = await this.model.findByPk(productID);
    if (!product) throw new AppException(409, "Product doesn't exist");
    await this.model.destroy({ where: { id: productID } });
    return product;
  }
}
