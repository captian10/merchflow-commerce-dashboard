import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { formatCategory, formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
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

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const statusBadge = getStatusBadge(product);
  const isUnavailable =
    product.status === "out-of-stock" || product.stock === 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
    >
      <article className="flex h-full flex-col">
        <div className="relative m-3 flex aspect-5/4 items-center justify-center rounded-xl bg-neutral-50 p-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-5 transition duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />

          <div className="absolute right-3 top-3">
            <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 pt-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              {formatCategory(product.category)}
            </p>

            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <Star className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="mt-3 text-base font-semibold leading-6 text-neutral-950 transition group-hover:text-neutral-700">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-5 flex items-end justify-between border-t border-neutral-100 pt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-semibold text-neutral-950">
                  {formatCurrency(product.price)}
                </p>

                {product.compareAtPrice ? (
                  <p className="text-sm text-neutral-400 line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </p>
                ) : null}
              </div>

              <p className="mt-1 text-xs text-neutral-500">
                {isUnavailable
                  ? "Currently unavailable"
                  : `${product.stock} units in stock`}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
