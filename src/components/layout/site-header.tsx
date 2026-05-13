import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";

const navigation = [
  { label: "Features", href: "/#features" },
  { label: "Products", href: "/products" },
  { label: "Workflow", href: "/#workflow" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-950"
        >
          MerchFlow
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartLink />

          <Link
            href="/products"
            className="hidden rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 sm:inline-flex"
          >
            View products
          </Link>
        </div>
      </div>
    </header>
  );
}
