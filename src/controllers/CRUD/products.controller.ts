import { ProductDto } from '@models/dtos';
import { Request, Response, NextFunction } from 'express';
import { CRUDController } from '@controllers/crud.controller';
import { ProductsService } from '@/services';

export class ProductsController extends CRUDController<ProductsService> {
  constructor() {
    super(new ProductsService());
  }

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products: { rows: ProductDto[]; count: number } = await this.service.getList();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      req.queryInfo.filter.id = id;
      const product: ProductDto = await this.service.getItem(req.queryInfo);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: ProductDto = req.body;
      const createdProduct: ProductDto = await this.service.createProduct(productData);
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.id = req.params.id;
      const productData: ProductDto = req.body;
      const updatedProduct: [number, ProductDto[]] = await this.service.update(productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.queryInfo.filter.id = req.params.id;
      const deletedProduct: number | void = await this.service.delete(req.queryInfo);
      res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  };
}
