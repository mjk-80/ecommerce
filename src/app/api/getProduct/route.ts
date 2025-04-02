import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://eu-west-2.cdn.hygraph.com/content/cm8wvbggp03gx08w2gbxlmrbs/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query {
            product(where: { id: "${productId}" }) {
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

    const data = await res.json();

    if (data.errors) {
      console.error("Error fetching product:", data.errors);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data.data.product);
  } catch (error) {
    console.error("Failed to fetch product:", error); // چاپ ارور دقیق در کنسول
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
