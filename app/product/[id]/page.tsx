import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <div className="container py-8">
        <Button variant="ghost" asChild className="rounded-full mb-6">
          <Link href="/">
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </Button>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
            </div>
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold">${Number(product.price).toFixed(2)}</p>
              {product.stock > 0 ? (
                <span className="text-sm text-muted-foreground">{product.stock} available</span>
              ) : (
                <span className="text-sm text-destructive font-medium">Out of stock</span>
              )}
            </div>
            <div className="pt-10">
            <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
