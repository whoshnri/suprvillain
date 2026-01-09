import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/currency"

export function ProductGrid({
  products,
  country,
}: {
  products: Product[]
  country: string
}) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} className="group">
          <Card className="overflow-hidden bg-card/80 hover:bg-card border backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 leading-tight">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-xl">{formatPrice(product.price, country)}</p>
                {product.stock > 0 ? (
                  <span className="text-sm font-medium text-muted-foreground">{product.stock} in stock</span>
                ) : (
                  <span className="text-sm font-medium text-destructive">Out of stock</span>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
