//این ای پی آی محصولات رو یه بار دیگه دریافت می کنه که در
//دایرکتوری /app/products/page.tsx
//مورد استفاده قرار می گیرد

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query {
              product(where: { id: "${id}" }) {
                id
                name
                price
                description
              }
            }
          `,
          }),
        }
      );

      const { data } = await response.json();
      res.status(200).json({ product: data.product });
    } catch {
      res.status(500).json({ error: "خطا در دریافت محصول" });
    }
  } else {
    res.status(405).json({ error: "متد پشتیبانی نمی‌شود." });
  }
}
