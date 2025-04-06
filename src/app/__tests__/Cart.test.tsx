//تست صفحه سبد خرید

import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../cart/page";
import { useCart } from "../context/CartContext";
import "@testing-library/jest-dom";

// Mock کردن useCart به طور دقیق
jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("CartPage", () => {
  it("سبد خرید خالی است", () => {
    // Mock کردن useCart برای حالت خالی بودن سبد خرید
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<CartPage />);

    expect(screen.getByText("سبد خرید شما خالی است.")).toBeInTheDocument();
  });

  it("محصولات را نمایش می‌دهد", () => {
    // Mock کردن useCart برای سبد خرید با محصولات
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "محصول 1",
          price: "10000",
          quantity: 1,
          image: "/path/to/image1.jpg",
        },
        {
          id: 2,
          name: "محصول 2",
          price: "20000",
          quantity: 2,
          image: "/path/to/image2.jpg",
        },
      ],
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<CartPage />);

    // بررسی نمایش محصولات
    expect(screen.getByText("محصول 1")).toBeInTheDocument();
    expect(screen.getByText("محصول 2")).toBeInTheDocument();
    expect(screen.getByText("10000 تومان")).toBeInTheDocument();
    expect(screen.getByText("20000 تومان")).toBeInTheDocument();
  });

  it("عملکرد دکمه حذف محصول", () => {
    const removeFromCartMock = jest.fn();

    // Mock کردن useCart برای سبد خرید با محصولات
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "محصول 1",
          price: "10000",
          quantity: 1,
          image: "/path/to/image1.jpg",
        },
      ],
      removeFromCart: removeFromCartMock,
      clearCart: jest.fn(),
    });

    render(<CartPage />);

    // شبیه‌سازی کلیک بر روی دکمه حذف
    fireEvent.click(screen.getByText("حذف"));

    // بررسی اینکه آیا تابع removeFromCart صدا زده شده است یا خیر
    expect(removeFromCartMock).toHaveBeenCalledWith(1);
  });

  it("عملکرد دکمه حذف همه", () => {
    const clearCartMock = jest.fn();

    // Mock کردن useCart برای سبد خرید با محصولات
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "محصول 1",
          price: "10000",
          quantity: 1,
          image: "/path/to/image1.jpg",
        },
      ],
      removeFromCart: jest.fn(),
      clearCart: clearCartMock,
    });

    render(<CartPage />);

    // شبیه‌سازی کلیک بر روی دکمه حذف همه
    fireEvent.click(screen.getByText("حذف همه"));

    // بررسی اینکه آیا تابع clearCart صدا زده شده است یا خیر
    expect(clearCartMock).toHaveBeenCalled();
  });

  it("لینک بازگشت به خرید درست کار می‌کند", () => {
    render(<CartPage />);

    // بررسی اینکه لینک به مسیر درست اشاره می‌کند
    const link = screen.getByText("بازگشت به خرید");
    expect(link).toHaveAttribute("href", "/products");
  });
});
