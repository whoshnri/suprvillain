import prisma from "@/lib/prisma"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { headers } from "next/headers"
import Link from "next/link"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const country = (await headers()).get("x-vercel-ip-country") || "GB"
  const params = await searchParams
  const category = params.category
  const search = params.search

  const products = await prisma.product.findMany({
    where: {
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
  })

  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  })

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  })

  return (
    <main className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-balance">
            Timeless Pieces, Modern Style
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover a curated collection of essentials, designed to blend seamlessly into your everyday life.
          </p>
        </div>
      </section>
      <section className="container py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-2 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground">Our latest and greatest, just for you.</p>
        </div>
        <ProductGrid products={featuredProducts} country={country} />
      </section>
      <section className="container py-12 md:py-16 bg-secondary/50">
        <div className="flex flex-col items-center text-center space-y-2 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground">Find what you're looking for, faster.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((c) => (
            <Link key={c.category} href={`/?category=${c.category}`} className="group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={`/placeholder.svg`}
                  alt={c.category}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="font-semibold text-xl text-white tracking-tight text-balance text-center p-2">
                    {c.category}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="container py-12">
        <ProductFilters categories={categories.map((c) => c.category)} />
        <ProductGrid products={products} country={country} />
      </div>
    </main>
  )
}
