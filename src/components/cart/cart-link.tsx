"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function CartLink() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link
      href="/cart"
      className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
    >
      <ShoppingBag className="h-4 w-4" />
      Cart
      {totalItems > 0 ? (
        <span className="rounded-full bg-neutral-950 px-2 py-0.5 text-xs text-white">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
