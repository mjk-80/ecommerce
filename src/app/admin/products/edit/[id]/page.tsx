//صفحه ویرایش محصول

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/api/products/route";

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // گرفتن اطلاعات محصول از API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT}/graphql`, // تغییر لینک به GraphQL endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
            },
            body: JSON.stringify({
              query: `
                query GetProduct($id: ID!) {
                  product(where: { id: $id }) {
                    id
                    name
                    price
                    description
                    image {
                      url
                    }
                  }
                }
              `,
              variables: { id: params.id },
            }),
          }
        );

        const { data } = await res.json();
        setFormData({
          name: data.product.name,
          price: data.product.price.toString(),
          description: data.product.description,
          image: data.product.image.url,
        });
      } catch {
        setError("مشکلی در دریافت اطلاعات محصول رخ داده است.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const updatedProduct = await updateProduct({
        id: params.id,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
      });

      if (updatedProduct) {
        router.push("/admin/products");
      } else {
        setError("مشکلی در به‌روزرسانی محصول رخ داده است.");
      }
    } catch {
      setError("خطایی رخ داده است.");
    }
  };

  if (loading) return <p>⏳ در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4"> ویرایش محصول</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="نام محصول"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="قیمت محصول"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="توضیحات محصول"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="لینک تصویر محصول"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
