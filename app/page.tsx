import prisma from "@/lib/prisma"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export const dynamic = "force-dynamic"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
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
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-balance">Discover Minimalist Essentials</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Curated collection of timeless pieces for your everyday life
          </p>
        </div>
        <ProductFilters categories={categories.map((c) => c.category)} />
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
