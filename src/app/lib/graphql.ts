//برقراری ارتباط با Hygraph و دریافت لیست محصولات با استفاده از Graphql

import { GraphQLClient } from "graphql-request";
import { Product } from "./types";

const graphQLAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!;
const graphQLToken = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

const client = new GraphQLClient(graphQLAPI, {
  headers: {
    Authorization: `Bearer ${graphQLToken}`,
  },
});

// تعریف کوئری GraphQL برای گرفتن لیست محصولات
export const GET_PRODUCTS_QUERY = `
  query {
    products {
      id
      name
      price
      slug
      description
      image {
        url
      }
    }
  }
`;

// تابعی برای گرفتن محصولات از API با استفاده از کوئری بالا
export const getProducts = async (): Promise<Product[]> => {
  try {
    const result = await client.request<{ products: Product[] }>(
      GET_PRODUCTS_QUERY
    );
    return result.products; // لیست محصولات را برمی‌گرداند
  } catch {
    throw new Error("خطا در گرفتن محصولات.");
  }
};
