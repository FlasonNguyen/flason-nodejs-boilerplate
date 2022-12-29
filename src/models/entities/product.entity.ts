import {
  Table,
  PrimaryKey,
  Column,
  DataType,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
  AllowNull,
  Validate,
  Scopes,
  DefaultScope,
  Index,
} from 'sequelize-typescript';
import { Category } from '@/common/constants';
import { IProduct } from '@/interfaces';

@Table({ tableName: 'product' })
export class ProductEntity extends Model<ProductEntity> implements IProduct {
  @Index
  @PrimaryKey
  @AllowNull
  @Default(DataType.UUIDV4)
  @Column({
    field: 'id',
    type: DataType.UUID,
  })
  id: string;

  @Index
  @Column({ field: 'title', type: DataType.STRING })
  title: string;

  @Column({ field: 'description', type: DataType.STRING })
  description: string;

  @Column({ field: 'price', type: DataType.FLOAT, defaultValue: 0, validate: { min: 0 } })
  price: number;

  @Column({ field: 'image', type: DataType.ARRAY(DataType.STRING) })
  image: string[];

  @Column({ field: 'category', type: DataType.STRING })
  category: Category;

  @Column({ field: 'stock', type: DataType.INTEGER, defaultValue: 0, validate: { min: 0 } })
  stock: number;

  @Column({ field: 'rating', type: DataType.FLOAT, defaultValue: 0, validate: { min: 0, max: 5 } })
  rating: number;

  @Column({ field: 'numReviews', type: DataType.INTEGER, defaultValue: 0, validate: { min: 0 } })
  numReviews: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  created_at: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updated_at: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deleted_at: Date;
}
