//این کامپوننت هدر سایت را نشان میدهد و شامل لینک هایی به بخش های مختلف سایت است

"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

const Header = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        فروشگاه اینترنتی
      </Link>
      <div className="flex space-x-4">
        <Link href="/products" className="text-lg">
          محصولات
        </Link>
        <Link href="/cart" className="relative">
          <span className="text-lg">سبد خرید</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/login" className="text-lg">
          ورود
        </Link>
      </div>
    </header>
  );
};

export default Header;
