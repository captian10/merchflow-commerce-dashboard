import { SiteHeader } from "@/components/layout/site-header";
import { ProductsCatalog } from "@/components/products/products-catalog";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <ProductsCatalog />
    </main>
  );
}
