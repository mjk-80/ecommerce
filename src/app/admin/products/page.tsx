//این صفحه لیستی از محصولات را نشان میدهد که امکان ویرایش و یا حذف
//محصولات نیز امکان پذیر است

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/app/lib/types";
import Link from "next/link";
import { deleteProduct } from "@/app/api/products/route";

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // گرفتن محصولات از API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
            },
            body: JSON.stringify({
              query: `
              query GetProducts {
                products {
                  id
                  name
                  price
                  slug
                  image {
                    url
                  }
                }
              }
            `,
            }),
          }
        );

        if (!res.ok) throw new Error("مشکلی در دریافت محصولات رخ داده است!");

        const { data } = await res.json();
        setProducts(data.products);
      } catch {
        setError("مشکلی در دریافت محصولات رخ داده است!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // حذف محصول
  const handleDelete = async (slug: string) => {
    const confirmDelete = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
    );
    if (!confirmDelete) return;

    try {
      // حذف محصول با استفاده از API
      const res = await deleteProduct(slug);

      if (res) {
        setProducts(products.filter((product) => product.slug !== slug));
      } else {
        setError("حذف محصول ناموفق بود.");
      }
    } catch {
      setError("مشکلی در حذف محصول رخ داده است.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"> مدیریت محصولات</h1>
      {loading && <p>⏳ در حال بارگذاری...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Link
        href="/admin/products/new"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        افزودن محصول
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <Image
              src={product.image.url}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-40 object-cover rounded-md"
              unoptimized
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700"> قیمت: {product.price} تومان</p>
            <Link
              href={`/admin/products/edit/${product.id}`}
              className="text-blue-500 p-5"
            >
              ویرایش
            </Link>
            <button
              onClick={() => handleDelete(product.slug)}
              className="text-red-500 hover:underline mt-2"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
