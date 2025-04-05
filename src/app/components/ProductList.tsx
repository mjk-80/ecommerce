//این کامپوننت لیستی از محصولات را نمایش میدهد و امکان مشاهده جزئیات
// باافزودن هر محصول به سبد خرید را فراهم می سازد

"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: { url: string };
}

export default function ProductList({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">محصولات</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg bg-white shadow"
          >
            <Image
              src={product.image.url}
              alt={product.name}
              width={500}
              height={300}
              unoptimized
              className="w-full h-60 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.price} تومان</p>
            <div className="items-center space-x-10">
              <Link href={`/products/${product.id}`}>
                <button className="bg-gray-500 text-white px-4 py-2 m-4 rounded mt-2">
                  مشاهده جزئیات
                </button>
              </Link>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image.url,
                    quantity: 1,
                  })
                }
                className="mt-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
