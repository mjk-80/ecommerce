//این کد مجموعه‌ای از توابع است که برای تعامل با API GraphQL Hygraph استفاده می‌شود.
// این توابع برای خواندن، ایجاد، به‌روزرسانی و حذف محصولات از سیستم استفاده می‌شود.

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[];
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(HYGRAPH_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: GraphQLResponse<T> = await res.json();
  if (json.errors)
    throw new Error(json.errors.map((err) => err.message).join(", "));
  return json.data;
}

// خواندن همه محصولات
export async function getProducts(): Promise<{ products: Product[] }> {
  const query = `
    query {
      products {
        id
        name
        price
        image
        description
      }
    }
  `;
  return fetchGraphQL<{ products: Product[] }>(query);
}

// ایجاد محصول جدید
export async function createProduct(
  product: Omit<Product, "id">
): Promise<{ createProduct: { id: string }; publishProduct: { id: string } }> {
  const mutation = `
    mutation CreateProduct($name: String!, $price: Float!, $image: String!, $description: String!) {
      createProduct(data: { name: $name, price: $price, image: $image, description: $description }) {
        id
      }
      publishProduct(where: { id: createProduct.id }) {
        id
      }
    }
  `;
  return fetchGraphQL(mutation, product);
}

// به‌روزرسانی محصول
export async function updateProduct(
  product: Required<Product>
): Promise<{ updateProduct: { id: string }; publishProduct: { id: string } }> {
  const mutation = `
    mutation UpdateProduct($id: ID!, $name: String!, $price: Float!, $image: String!, $description: String!) {
      updateProduct(where: { id: $id }, data: { name: $name, price: $price, image: $image, description: $description }) {
        id
      }
      publishProduct(where: { id: $id }) {
        id
      }
    }
  `;
  return fetchGraphQL(mutation, product);
}

// حذف محصول
export async function deleteProduct(
  id: string
): Promise<{ deleteProduct: { id: string } }> {
  const mutation = `
    mutation DeleteProduct($id: ID!) {
      deleteProduct(where: { id: $id }) {
        id
      }
    }
  `;
  return fetchGraphQL(mutation, { id });
}
