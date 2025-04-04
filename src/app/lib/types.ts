// تعریف یک اینترفیس TypeScript برای نوع Product (محصول)
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: { url: string };
  slug: string;
}
