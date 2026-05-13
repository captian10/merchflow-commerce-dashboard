import Link from "next/link";
import { ArrowRight, BarChart3, Package, ShoppingCart } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 3);

const stats = [
  { label: "Products managed", value: "120+" },
  { label: "Active categories", value: "12" },
  { label: "Monthly orders", value: "2.4k" },
];

const features = [
  {
    title: "Product management",
    description:
      "Create, update, filter, and organize products from a structured admin workflow.",
    icon: Package,
  },
  {
    title: "Storefront experience",
    description:
      "Browse products with clear details, categories, and a focused shopping flow.",
    icon: ShoppingCart,
  },
  {
    title: "Operational overview",
    description:
      "Track inventory, product status, and store metrics from a dashboard view.",
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Commerce dashboard
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              A storefront and admin dashboard for managing online store
              operations.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600">
              MerchFlow is a front-end e-commerce management project focused on
              product browsing, inventory visibility, cart flows, and practical
              admin workflows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#products"
                className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Explore products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="#features"
                className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
              >
                View features
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-neutral-400">Dashboard preview</p>
                <h2 className="mt-1 text-xl font-semibold">Store overview</h2>
              </div>

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                Active
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/3 p-4"
                >
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            Built around real e-commerce workflows.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-100">
                  <Icon className="h-5 w-5 text-neutral-800" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="products" className="border-y border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Products
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
                Featured inventory
              </h2>
            </div>

            <Link
              href="/products"
              className="text-sm font-medium text-neutral-950 transition hover:text-neutral-600"
            >
              View all products
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Project direction
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            Planned application flow.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Product catalog
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Listing pages, search, category filters, sorting, and product
                details.
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Cart flow
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Cart items, quantities, subtotal, and checkout summary.
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="text-sm font-semibold text-neutral-950">
                Admin dashboard
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Product forms, validation, inventory tables, and metrics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
