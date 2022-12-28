import { ProductEntity } from '@/models';
import { ProductDto } from '@/models/dtos';
import { AppException } from '@/common/exceptions';
import { CRUDService } from '@services/crud.service';
import { IQueryOption } from '@/interfaces';

export class ProductsService extends CRUDService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  public async findProductById(productID: string): Promise<ProductDto> {
    if (!productID) throw new AppException(400, 'ProductID is empty');
    return await this.model.findByPk(productID);
  }

  public async createProduct(productData: ProductDto, option?: IQueryOption): Promise<ProductDto> {
    if (!productData) throw new AppException(400, 'Product data is empty');
    return await this.model.create(productData, option);
  }

  public async updateProduct(productData: ProductDto, option?: IQueryOption): Promise<[number, ProductDto[]]> {
    if (!productData) throw new AppException(400, 'Product data is empty');
    const product = await this.model.findByPk(productData.id);
    if (!product) throw new AppException(409, "Product doesn't exist");
    return await this.model.update(productData, { where: { id: productData.id }, returning: true, ...option });
  }

  public async deleteProduct(productID: string): Promise<ProductDto> {
    const transaction = await this.transaction();
    if (!productID) throw new AppException(400, 'ProductID is empty');
    const product = await this.model.findByPk(productID);
    if (!product) throw new AppException(409, "Product doesn't exist");
    await this.model.destroy({ where: { id: productID }, transaction });
    await transaction.commit();
    return product;
  }
}
