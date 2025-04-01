import { notFound } from "next/navigation";

export default function ProductDetails({ params }: { params: { id: string } }) {
  if (!params) return notFound;

  return (
    <div>
      <h1>جزئیات محصول</h1>
      <p>شناسه محصول: {params.id}</p>
    </div>
  );
}
