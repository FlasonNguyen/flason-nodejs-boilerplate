import {IsString, IsNumber, IsUrl, IsEnum, IsDate} from 'class-validator';
import {Category} from '@/common/constants';
import {IProduct} from '@/interfaces';

export class ProductDto implements IProduct {
    @IsString()
    public id: string;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsNumber({allowNaN: false, allowInfinity: false})
    public price: number;

    @IsUrl()
    public image: string[];

    @IsEnum(Category)
    public category: Category;

    @IsString()
    public stock: number;

    @IsString()
    public rating: number;

    @IsString()
    public numReviews: number;

    @IsDate()
    public created_at: Date;

    @IsDate()
    public updated_at: Date;
}
