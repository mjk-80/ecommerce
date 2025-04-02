import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const response = await fetch(
        "https://eu-west-2.cdn.hygraph.com/content/cm8wvbggp03gx08w2gbxlmrbs/master",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            mutation {
              deleteProduct(where: { id: "${id}" }) {
                id
              }
            }
          `,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("مشکلی در حذف محصول رخ داده است!");
      }

      res.status(200).json({ message: "محصول با موفقیت حذف شد." });
    } catch (error) {
      res.status(500).json({ error: "خطا در حذف محصول." });
      console.log("خطا در حذف محصول", error);
    }
  } else {
    res.status(405).json({ error: "متد درخواست پشتیبانی نمی‌شود." });
  }
}
