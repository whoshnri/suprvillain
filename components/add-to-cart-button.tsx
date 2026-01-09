"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { FiShoppingCart, FiMinus, FiPlus, FiCheck } from "react-icons/fi"
import { useState } from "react"
import { Product } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, getItem, updateQuantity, removeItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const hasSizes = product.sizes && product.sizes.length > 0

  // For the product page, we might just want to show "Add to Cart" 
  // and handle the quantity/size specific stuff in the modal or on the cart

  const handleAddToCart = (size?: string) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      size: size || undefined,
    })
    if (hasSizes) setIsOpen(false)
  }

  const renderAddButton = (size?: string) => {
    const item = getItem(product.id, size)
    const quantity = item?.quantity || 0

    if (quantity > 0) {
      return (
        <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1, size)}
            className="p-1 hover:text-primary transition-colors"
          >
            <FiMinus className="h-5 w-5" />
          </button>
          <span className="font-black text-xl min-w-6 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1, size)}
            className="p-1 hover:text-primary transition-colors disabled:opacity-20"
            disabled={quantity >= product.stock}
          >
            <FiPlus className="h-5 w-5" />
          </button>
        </div>
      )
    }

    return (
      <Button
        onClick={() => handleAddToCart(size)}
        disabled={product.stock === 0}
        className="rounded-full font-black uppercase tracking-widest px-8"
      >
        Add To Cart
      </Button>
    )
  }

  if (hasSizes) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            disabled={product.stock === 0}
            className="h-16 rounded-full w-full text-lg font-black uppercase tracking-[0.2em] text-black bg-primary hover:text-black  transition-all shadow-2xl"
          >
            <FiShoppingCart className="mr-3 h-6 w-6" />
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-4xl border-0 shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter uppercase mb-6">Select Your Size</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {product.sizes.map((size) => {
              const item = getItem(product.id, size)
              const isInCart = (item?.quantity || 0) > 0

              return (
                <div
                  key={size}
                  className={cn(
                    "relative group cursor-pointer border-2 rounded-2xl p-6 transition-all hover:border-primary",
                    isInCart ? "border-primary bg-primary/5" : "border-neutral-100 dark:border-neutral-800"
                  )}
                  onClick={() => !isInCart && handleAddToCart(size)}
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-2xl font-black">{size}</span>
                    {isInCart ? (
                      <div className="flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, item!.quantity - 1, size) }} className="hover:text-primary"><FiMinus /></button>
                        <span className="font-bold text-lg">{item!.quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, item!.quantity + 1, size) }} className="hover:text-primary" disabled={item!.quantity >= product.stock}><FiPlus /></button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold uppercase text-neutral-400">Add to cart</span>
                    )}
                  </div>
                  {isInCart && (
                    <div className="absolute top-2 right-2 bg-primary text-black rounded-full p-1">
                      <FiCheck className="h-3 w-3" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{product.stock} items left in stock</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="w-full">
      <Button
        size="lg"
        onClick={() => handleAddToCart()}
        disabled={product.stock === 0}
        className="h-16 rounded-full w-full text-lg font-black uppercase tracking-[0.2em] bg-black text-white hover:bg-primary hover:text-black transition-all shadow-2xl"
      >
        <FiShoppingCart className="mr-3 h-6 w-6" />
        Add to cart
      </Button>
      {getItem(product.id)?.quantity ? (
        <div className="mt-4 flex items-center justify-center gap-6">
          <button onClick={() => updateQuantity(product.id, getItem(product.id)!.quantity - 1)} className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-sm hover:text-primary transition-colors"><FiMinus className="h-6 w-6" /></button>
          <span className="text-2xl font-black">{getItem(product.id)!.quantity}</span>
          <button onClick={() => updateQuantity(product.id, getItem(product.id)!.quantity + 1)} className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-sm hover:text-primary transition-colors" disabled={getItem(product.id)!.quantity >= product.stock}><FiPlus className="h-6 w-6" /></button>
        </div>
      ) : null}
    </div>
  )
}
