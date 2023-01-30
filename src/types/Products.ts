import { Category } from './Category';

export type Products = {
  id: number;
  title: string;
  images: string;
  category: Category;
  price: number;
};
