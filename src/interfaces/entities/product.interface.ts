import { Category } from '@/common/constants';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string[];
  category: Category;
  stock: number;
  rating: number;
  numReviews: number;
  created_at: Date;
  updated_at: Date;
}
