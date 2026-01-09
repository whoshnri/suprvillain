import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { headers } from "next/headers"
import { formatPrice } from "@/lib/currency"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const country = (await headers()).get("x-vercel-ip-country") || "GB"
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { campaign: true }
  })

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container py-12 md:py-20 mx-auto px-4">
        <Button variant="link" asChild className="mb-12 -ml-4 text-xs font-black uppercase tracking-[0.2em] group p-0 h-auto">
          <Link href={product.campaignId ? `/campaign/${product.campaignId}` : "/"}>
            <FiArrowLeft className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to {product.campaign?.title || "Collection"}
          </Link>
        </Button>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-7xl mx-auto">
          <div className="relative aspect-3/4 overflow-hidden bg-white dark:bg-neutral-900 rounded-[3rem] shadow-2xl">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-12 py-8">
            <div className="space-y-6">
              <Badge variant="outline" className="px-3 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border-primary text-primary">
                {product.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-balance">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-xl">
                {product.description}
              </p>
            </div>

            {(product.sizes && product.sizes.length > 0) && (
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-16 h-16 border-2 border-neutral-200 dark:border-neutral-800 rounded-full flex items-center justify-center text-sm font-black hover:border-primary hover:bg-primary hover:text-black transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col space-y-8">
                <div className="space-y-2">
                  <p className="text-5xl font-black tracking-tighter">{formatPrice(product.price, country)}</p>
                  {product.stock > 0 ? (
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.stock} left in stock</span>
                  ) : (
                    <span className="text-xs font-bold text-destructive uppercase tracking-widest">Out of stock</span>
                  )}
                </div>
                <div className="max-w-md w-full">
                  <AddToCartButton product={product as any} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
