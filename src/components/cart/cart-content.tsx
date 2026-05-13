"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function CartContent() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());

  const shipping = items.length > 0 ? 12 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Browse the product catalog and add items to start building an order.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Cart
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
            Review your order
          </h1>
        </div>

        <Button variant="secondary" onClick={clearCart}>
          Clear cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-500">
                    {item.product.category}
                  </p>

                  <Link
                    href={`/products/${item.product.slug}`}
                    className="mt-1 block text-lg font-semibold text-neutral-950 transition hover:text-neutral-600"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-2 text-sm text-neutral-600">
                    {formatCurrency(item.product.price)} each
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center rounded-md border border-neutral-200">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.product.id)}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-10 text-center text-sm font-medium text-neutral-950">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.product.id)}
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-950"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-950">
            Order summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-medium text-neutral-950">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span className="font-medium text-neutral-950">
                {formatCurrency(shipping)}
              </span>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-950">Total</span>
                <span className="text-xl font-semibold text-neutral-950">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <Button className="mt-6 w-full">Continue to checkout</Button>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Checkout is currently represented as a front-end flow. Payment
            integration can be added later.
          </p>
        </aside>
      </div>
    </section>
  );
}
