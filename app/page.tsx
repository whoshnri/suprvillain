import prisma from "@/lib/prisma"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { headers } from "next/headers"

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

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  })

  return (
    <main className="min-h-screen">
      <section className="py-20 md:py-32 bg-secondary/50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-balance">
            Welcome to Suprvillain Store
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover a curated collection of timeless pieces, designed to blend seamlessly into your everyday life.
          </p>
        </div>
      </section>
      <div className="container py-12">
        <ProductFilters categories={categories.map((c) => c.category)} />
        <ProductGrid products={products} country={country} />
      </div>
    </main>
  )
}
