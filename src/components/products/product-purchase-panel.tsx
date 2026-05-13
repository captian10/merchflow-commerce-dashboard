"use client";

import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isUnavailable =
    product.status === "out-of-stock" || product.stock === 0;

  return (
    <div className="mt-8 rounded-xl border border-neutral-200 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-950">
            Ready to add this product?
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            Add it to the cart and review the order summary before checkout.
          </p>
        </div>

        <Button
          onClick={() => addItem(product)}
          disabled={isUnavailable}
          className="sm:w-auto"
        >
          {isUnavailable ? "Unavailable" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
