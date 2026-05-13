import Link from "next/link";
import { ArrowLeft, Box, Layers, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { formatCategory, formatCurrency } from "@/lib/utils";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getStatusBadge(status: string) {
  if (status === "out-of-stock") {
    return { label: "Out of stock", tone: "warning" as const };
  }

  if (status === "draft") {
    return { label: "Draft", tone: "muted" as const };
  }

  return { label: "Active", tone: "success" as const };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product not found | MerchFlow",
    };
  }

  return {
    title: `${product.name} | MerchFlow`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const statusBadge = getStatusBadge(product.status);

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id &&
        item.status === "active",
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-neutral-100 text-sm font-medium text-neutral-500">
              {formatCategory(product.category)}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>

              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                {formatCategory(product.category)}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-semibold text-neutral-950">
                {formatCurrency(product.price)}
              </p>

              {product.compareAtPrice ? (
                <p className="pb-1 text-base text-neutral-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 p-4">
                <Box className="h-5 w-5 text-neutral-500" />
                <p className="mt-3 text-sm text-neutral-500">Stock</p>
                <p className="mt-1 text-lg font-semibold text-neutral-950">
                  {product.stock} units
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-4">
                <Star className="h-5 w-5 text-neutral-500" />
                <p className="mt-3 text-sm text-neutral-500">Rating</p>
                <p className="mt-1 text-lg font-semibold text-neutral-950">
                  {product.rating.toFixed(1)}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-4">
                <Layers className="h-5 w-5 text-neutral-500" />
                <p className="mt-3 text-sm text-neutral-500">Status</p>
                <p className="mt-1 text-lg font-semibold text-neutral-950">
                  {formatCategory(product.status)}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Admin note
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                This page is connected to the product catalog data and will
                later support cart actions, inventory updates, and admin
                editing.
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Related
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                  Similar products
                </h2>
              </div>

              <Link
                href="/products"
                className="text-sm font-medium text-neutral-950 transition hover:text-neutral-600"
              >
                View catalog
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm text-neutral-500">
                    {formatCategory(item.category)}
                  </p>
                  <h3 className="mt-2 font-semibold text-neutral-950">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-600">
                    {formatCurrency(item.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
