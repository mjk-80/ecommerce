import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import Link from "next/link";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه آنلاین با محصولات متنوع",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className="bg-gray-100">
        <CartProvider>
          <header className="bg-blue-600 text-white p-4 text-center">
            <nav className="flex justify-between items-center max-w-4xl mx-auto">
              <h1 className="text-xl font-bold">فروشگاه اینترنتی</h1>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="hover:text-gray-300">
                    خانه
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-gray-300">
                    محصولات
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-gray-300">
                    سبد خرید
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="p-6">{children}</main>
          <footer className="bg-gray-800 text-white p-4 text-center mt-6">
            © ۲۰۲۵ - تمامی حقوق محفوظ است.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
