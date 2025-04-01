import type { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
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
          <Header />
          <main className="p-6">{children}</main>
          <footer className="bg-gray-800 text-white p-4 text-center mt-6">
            © ۲۰۲۵ - تمامی حقوق محفوظ است.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
