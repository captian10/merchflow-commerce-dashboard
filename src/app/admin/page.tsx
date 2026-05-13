import Link from "next/link";
import { AlertTriangle, Boxes, DollarSign, PackageCheck } from "lucide-react";
import { AdminMetricCard } from "@/components/admin/admin-metric-card";
import { AdminProductsTable } from "@/components/admin/admin-products-table";
import { SiteHeader } from "@/components/layout/site-header";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  const activeProducts = products.filter(
    (product) => product.status === "active",
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.status === "out-of-stock",
  ).length;

  const totalStock = products.reduce((total, product) => {
    return total + product.stock;
  }, 0);

  const inventoryValue = products.reduce((total, product) => {
    return total + product.price * product.stock;
  }, 0);

  return (
    <main className="min-h-screen bg-neutral-50">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
              Admin dashboard
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
              Store operations overview
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
              Track inventory health, product visibility, and estimated stock
              value from a practical e-commerce dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
            >
              View products
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Add product
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <AdminMetricCard
            title="Active products"
            value={String(activeProducts)}
            description="Products currently visible and ready for customers."
            icon={<PackageCheck className="h-5 w-5" />}
          />

          <AdminMetricCard
            title="Total stock"
            value={String(totalStock)}
            description="Available inventory units across all categories."
            icon={<Boxes className="h-5 w-5" />}
          />

          <AdminMetricCard
            title="Inventory value"
            value={formatCurrency(inventoryValue)}
            description="Estimated value based on current prices and stock."
            icon={<DollarSign className="h-5 w-5" />}
          />

          <AdminMetricCard
            title="Needs attention"
            value={String(outOfStockProducts)}
            description="Products that are currently unavailable or out of stock."
            icon={<AlertTriangle className="h-5 w-5" />}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <AdminProductsTable />

          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-950">
              Next admin tasks
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-950">
                  Product forms
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Add and edit product forms will use React Hook Form and Zod
                  validation.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-950">
                  Inventory rules
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Product status and stock levels will control storefront
                  availability.
                </p>
              </div>

              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-950">
                  Data layer
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Local seed data can later be replaced with Supabase or an API.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
