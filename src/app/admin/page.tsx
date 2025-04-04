//صفحه اصلی ادمین پنل

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminPanel = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      router.push("/login"); // اگر لاگین نکرده، هدایت به لاگین
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎛 داشبورد مدیریت</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/products"
          className="p-4 bg-blue-500 text-white rounded-lg text-center shadow-md"
        >
          🛒 مدیریت محصولات
        </Link>
        <Link
          href="/"
          className="p-4 bg-gray-500 text-white rounded-lg text-center shadow-md"
        >
          🏠 بازگشت به سایت
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
