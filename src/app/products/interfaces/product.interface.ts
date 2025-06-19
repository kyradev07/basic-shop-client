import { Category } from '@products/interfaces/category.interface';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
  category: Category;
}
