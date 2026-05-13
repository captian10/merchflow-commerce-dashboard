"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import type { ProductCategory, ProductStatus } from "@/types/product";
import { formatCategory } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";

type CategoryFilter = "all" | ProductCategory;
type StatusFilter = "all" | ProductStatus;
type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "stock";

const categories: CategoryFilter[] = [
  "all",
  "electronics",
  "clothing",
  "accessories",
  "home",
  "fitness",
];

const statuses: StatusFilter[] = ["all", "active", "draft", "out-of-stock"];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Highest rated", value: "rating" },
  { label: "Most stock", value: "stock" },
];

export function ProductsCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery);

        const matchesCategory =
          category === "all" || product.category === category;

        const matchesStatus = status === "all" || product.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "stock") return b.stock - a.stock;

        return 0;
      });
  }, [searchQuery, category, status, sortBy]);

  const hasResults = filteredProducts.length > 0;

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Product catalog
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
                Inventory overview
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
                Browse products, compare availability, and filter the catalog
                using practical e-commerce controls.
              </p>
            </div>

            <div className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-950">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </div>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Search className="h-4 w-4 text-neutral-400" />
                Search
              </span>

              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products"
                className="bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">
                Category
              </span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as CategoryFilter)
                }
                className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All categories" : formatCategory(item)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">
                Status
              </span>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as StatusFilter)
                }
                className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All statuses" : formatCategory(item)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-700">
                <SlidersHorizontal className="h-4 w-4 text-neutral-400" />
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400"
              >
                {sortOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {hasResults ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-neutral-950">
              No products found
            </h2>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search query, category, status, or sorting
              option.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
