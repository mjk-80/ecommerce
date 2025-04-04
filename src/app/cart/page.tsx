//این کامپوننت صفحه سبد خرید را نمایش می دهد و امکان حذف محصولات
//از سبد خرید یا پاک کردن همه محصولات را فراهم می کند

"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">سبد خرید</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">سبد خرید شما خالی است.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between  border-b pb-3 mb-3"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                unoptimized
                className="rounded"
              ></Image>
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price} تومان</p>
                <p className="text-gray-500">تعداد: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              حذف همه
            </button>
            <Link
              href="/products"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              بازگشت به خرید
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
