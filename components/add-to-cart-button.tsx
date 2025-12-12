"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi"
import { useState } from "react"
import { Product } from "@/lib/types"

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, getItem, updateQuantity, removeItem } = useCart()
  const [quantity, setQuantity] = useState(getItem(product.id)?.quantity || 0)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
    })
    setQuantity(1)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(product.id)
      setQuantity(0)
    } else {
      updateQuantity(product.id, newQuantity)
      setQuantity(newQuantity)
    }
  }

  if (quantity > 0) {
    return (
      <div className="flex items-center gap-2 w-full">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => handleUpdateQuantity(quantity - 1)}
        >
          <FiMinus className="h-5 w-5" />
        </Button>
        <span className="font-medium text-lg">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={quantity >= product.stock}
        >
          <FiPlus className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="rounded-full w-full sm:w-auto min-w-[200px]"
      >
        <FiShoppingCart className="mr-2 h-5 w-5" />
        Add to cart
      </Button>
      
    </>
  )
}
