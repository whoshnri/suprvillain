"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { FiShoppingCart, FiMinus, FiPlus, FiX } from "react-icons/fi"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/currency"
import { useState } from "react"

export function CartSheet() {
  const { items, removeItem, updateQuantity, total, itemCount, country } = useCart()
  const [open, setOpen] = useState(false)


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full bg-transparent border-neutral-200 dark:border-neutral-800">
          <FiShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-black text-[10px] flex items-center justify-center font-black">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg rounded-l-[2.5rem] p-0 border-0 shadow-2xl">
        <div className="flex flex-col h-full bg-white dark:bg-neutral-950">
          <SheetHeader className="p-8 border-b border-neutral-100 dark:border-neutral-900">
            <SheetTitle className="text-3xl font-black tracking-tighter uppercase">Your Cart</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                <FiShoppingCart className="h-16 w-16" />
                <p className="font-bold uppercase tracking-widest text-xs">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center group">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-black text-sm uppercase tracking-tight truncate leading-none">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>

                    {item.size && (
                      <span className="inline-block px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] font-black uppercase tracking-widest">
                        Size: {item.size}
                      </span>
                    )}

                    <p className="text-xs font-bold text-neutral-400">{formatPrice(item.price, country)}</p>

                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 rounded-full px-3 py-1">
                        <button
                          className="hover:text-primary transition-colors disabled:opacity-20"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        >
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-black min-w-4 text-center">{item.quantity}</span>
                        <button
                          className="hover:text-primary transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        >
                          <FiPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Total</span>
                <span className="text-3xl font-black tracking-tighter">{formatPrice(total, country)}</span>
              </div>
              <Button
                onClick={() => setOpen(false)}
                asChild
                className="w-full h-16 rounded-full text-lg font-black uppercase tracking-[0.2em] shadow-xl"
                size="lg"
              >
                <Link href="/checkout">Complete Order</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
