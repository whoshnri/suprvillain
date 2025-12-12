import prisma from "@/lib/prisma"
import { ProductList } from "@/components/product-list"
import { CreateProductButton } from "@/components/create-product-button"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="min-h-screen">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and inventory</p>
          </div>
          <CreateProductButton />
        </div>
        <ProductList products={products} />
      </div>
    </main>
  )
}
