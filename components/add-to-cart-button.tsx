"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { FiShoppingCart, FiCheck } from "react-icons/fi"
import { useState } from "react"
import { Product } from "@/lib/types"


export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      size="lg"
      onClick={handleAddToCart}
      disabled={product.stock === 0 || added}
      className="rounded-full w-full sm:w-auto min-w-[200px]"
    >
      {added ? (
        <>
          <FiCheck className="mr-2 h-5 w-5" />
          Added to cart
        </>
      ) : (
        <>
          <FiShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </>
      )}
    </Button>
  )
}
