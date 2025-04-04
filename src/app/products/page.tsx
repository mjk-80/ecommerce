//نمایش لیست محصولات به کاربر

import ProductList from "../components/ProductList";
import { getProducts } from "../lib/graphql";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
