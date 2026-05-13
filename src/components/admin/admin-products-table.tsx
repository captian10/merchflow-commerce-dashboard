import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import type { ProductStatus } from "@/types/product";
import { formatCategory, formatCurrency } from "@/lib/utils";

function getStatusBadge(status: ProductStatus) {
  if (status === "out-of-stock") {
    return { label: "Out of stock", tone: "warning" as const };
  }

  if (status === "draft") {
    return { label: "Draft", tone: "muted" as const };
  }

  return { label: "Active", tone: "success" as const };
}

export function AdminProductsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">
            Product inventory
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Review catalog visibility, stock levels, pricing, and product
            status.
          </p>
        </div>

        <Link
          href="/products"
          className="text-sm font-medium text-neutral-950 transition hover:text-neutral-600"
        >
          View storefront
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-215 text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => {
              const statusBadge = getStatusBadge(product.status);

              return (
                <tr key={product.id} className="bg-white">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-neutral-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-neutral-950">
                          {product.name}
                        </p>
                        <p className="mt-1 max-w-xs truncate text-neutral-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {formatCategory(product.category)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>
                  </td>

                  <td className="px-5 py-4 font-medium text-neutral-950">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {product.stock} units
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {product.rating.toFixed(1)}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 font-medium text-neutral-950 transition hover:text-neutral-600"
                    >
                      View
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
