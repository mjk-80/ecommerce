"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: { url: string };
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("Params:", params);

  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  // const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          "https://eu-west-2.cdn.hygraph.com/content/cm8wvbggp03gx08w2gbxlmrbs/master",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
              query GetProduct($id: ID!) {
                product(where: {id: $id}) {
                  id
                  name
                  price
                  description
                  image{
                    url
                  }
                }
              }
            `,
              variables: { id },
            }),
          }
        );

        const { data } = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("error fetching data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10">در حال بارگزاری ...</p>;
  if (!product)
    return <p className="text-center mt-10 text-red-500">محصول یافت نشد!</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <Image
          src={product.image.url}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-auto rounded-lg"
          unoptimized
        />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-700 my-3">{product.description}</p>
        <p className="text-lg font-semibold text-green-600">
          قیمت: {product.price}
        </p>
        <button
          onClick={() =>
            addToCart({ ...product, quantity: 1, image: product.image.url })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
