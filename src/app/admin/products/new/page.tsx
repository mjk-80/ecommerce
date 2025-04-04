//صفحه ایجاد محصول جدید

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/api/products/route";

const NewProductPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ارسال درخواست برای ایجاد محصول
      const newProduct = await createProduct({
        name,
        price: parseFloat(price),
        description,
        image,
      });

      if (newProduct) {
        router.push("/admin/products");
      } else {
        setError("مشکلی در افزودن محصول به وجود آمد.");
      }
    } catch {
      setError("مشکلی در ارسال اطلاعات به سرور پیش آمد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">افزودن محصول جدید</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="نام محصول"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="توضیحات محصول"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="لینک تصویر محصول"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "⏳ در حال افزودن..." : " افزودن محصول"}
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;
