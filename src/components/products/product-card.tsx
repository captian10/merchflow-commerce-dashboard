import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { formatCategory, formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

function getStatusBadge(product: Product) {
  if (product.status === "out-of-stock") {
    return { label: "Out of stock", tone: "warning" as const };
  }

  if (product.status === "draft") {
    return { label: "Draft", tone: "muted" as const };
  }

  return { label: "Active", tone: "success" as const };
}

export function ProductCard({ product }: ProductCardProps) {
  const statusBadge = getStatusBadge(product);

  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium text-neutral-500">
        {formatCategory(product.category)}
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-neutral-500">
              {formatCategory(product.category)}
            </p>

            <h3 className="mt-1 line-clamp-1 text-base font-semibold text-neutral-950">
              {product.name}
            </h3>
          </div>

          <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-neutral-600">
          {product.description}
        </p>

        <div className="flex items-end justify-between border-t border-neutral-100 pt-4">
          <div>
            <p className="text-lg font-semibold text-neutral-950">
              {formatCurrency(product.price)}
            </p>

            {product.compareAtPrice ? (
              <p className="text-sm text-neutral-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <p className="text-sm text-neutral-500">{product.stock} units</p>
        </div>
      </div>
    </article>
  );
}
