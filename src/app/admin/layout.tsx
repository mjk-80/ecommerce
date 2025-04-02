import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">🎯 پنل مدیریت</h1>
        <div>
          <Link href="/admin" className="px-4 py-2">
            داشبورد
          </Link>
          <Link href="/admin/products" className="px-4 py-2">
            محصولات
          </Link>
          <Link href="/" className="px-4 py-2">
            🏠 سایت
          </Link>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
