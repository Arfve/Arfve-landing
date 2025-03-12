// app/product/page.tsx
import { GetReservationPage } from "@/lib/getProductData";
import TechSpecs from "@/components/Product/TechSpecs";
import Item from "@/components/Product/item";

export default async function Page() {
  const data = await GetReservationPage();
  if (!data) {
    return <div>Error loading product.</div>;
  }

  const { product, productTS } = data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <Item product={product} />
      <TechSpecs productTS={productTS} />
    </div>
  );
}
