//تست دریافت لیست محصولات

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "../ProductList";
import "@testing-library/jest-dom";

// تابع addToCart را mock می‌کنیم
const mockAddToCart = jest.fn();

// مسیر درست به useCart داخل context/CartContext
jest.mock("../../context/CartContext", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

// داده‌های تستی
const mockProducts = [
  {
    id: "1",
    name: "محصول اول",
    price: 10000,
    image: { url: "https://via.placeholder.com/500" },
  },
  {
    id: "2",
    name: "محصول دوم",
    price: 20000,
    image: { url: "https://via.placeholder.com/500" },
  },
];

describe("کامپوننت ProductList", () => {
  it("محصولات را نمایش می‌دهد", () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText("محصول اول")).toBeInTheDocument();
    expect(screen.getByText("محصول دوم")).toBeInTheDocument();
    expect(screen.getByText("10000 تومان")).toBeInTheDocument();
    expect(screen.getByText("20000 تومان")).toBeInTheDocument();
  });

  it("لینک 'مشاهده جزئیات' به مسیر درست اشاره دارد", () => {
    render(<ProductList products={mockProducts} />);
    const detailLinks = screen.getAllByText("مشاهده جزئیات");
    expect(detailLinks[0].closest("a")).toHaveAttribute("href", "/products/1");
    expect(detailLinks[1].closest("a")).toHaveAttribute("href", "/products/2");
  });

  it("با کلیک روی 'افزودن به سبد خرید' تابع addToCart صدا زده می‌شود", async () => {
    render(<ProductList products={mockProducts} />);
    const addButton = screen.getAllByText("افزودن به سبد خرید")[0];
    await userEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: "1",
      name: "محصول اول",
      price: 10000,
      image: "https://via.placeholder.com/500",
      quantity: 1,
    });
  });
});
