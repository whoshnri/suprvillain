import prisma from "@/lib/prisma"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { headers } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { CategoryGrid } from "@/components/category-grid"

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
            Effortless Style, Endless Vibes.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Your new favorite fits are here. We've got the drip you need to own your look, 24/7.
          </p>
        </div>
      </section>
      <section className="container py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-2 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Fresh Drops</h2>
          <p className="text-muted-foreground">The hype is real. Cop these before they sell out.</p>
        </div>
        <ProductGrid products={featuredProducts} country={country} />
      </section>
      <section className="container py-12 md:py-16 bg-secondary/50">
        <div className="flex flex-col items-center text-center space-y-2 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Find Your Vibe</h2>
          <p className="text-muted-foreground">Whatever your aesthetic, we've got the gear.</p>
        </div>
        <CategoryGrid
          categories={categories.map((c) => ({
            name: c.category,
            image: `/${c.category.toLowerCase()}.png`,
          }))}
        />
      </section>
      <div className="container py-12">
        <ProductFilters categories={categories.map((c) => c.category)} />
        <ProductGrid products={products} country={country} />
      </div>
    </main>
  )
}
