import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Product } from "@/lib/types"


export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="overflow-hidden border-0 bg-muted/40 hover:bg-muted/60 transition-colors group cursor-pointer">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base mb-1 leading-tight">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                {product.stock > 0 ? (
                  <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                ) : (
                  <span className="text-xs text-destructive">Out of stock</span>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
