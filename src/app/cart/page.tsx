import { SiteHeader } from "@/components/layout/site-header";
import { CartContent } from "@/components/cart/cart-content";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />
      <CartContent />
    </main>
  );
}
