"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/app/actions/orders"
import Image from "next/image"
import Link from "next/link"
import { FiArrowLeft, FiX } from "react-icons/fi"
import { formatPrice } from "@/lib/currency"

export default function CheckoutPage() {
  const { items, total, clearCart, country, setCountry } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    await createOrder(formData, items, total)

    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-4xl shadow-xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Your Cart is Empty</h2>
            <p className="text-neutral-400 font-medium mb-6">You haven't added any products to your cart yet.</p>
            <Button asChild className="rounded-full px-8 h-12 font-black uppercase tracking-widest">
              <Link href="/">Back to Shop</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container py-12 md:py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <Button variant="link" asChild className="rounded-full -ml-4 p-0 h-auto text-xs font-black uppercase tracking-widest group mb-4">
              <Link href="/" className="flex items-center">
                <FiArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Shop
              </Link>
            </Button>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">Checkout</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight pb-4 border-b border-neutral-100 dark:border-neutral-800">1. Shipping Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Full Name</Label>
                      <Input id="name" name="name" required className="rounded-2xl h-14 bg-neutral-50 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address</Label>
                      <Input id="email" name="email" type="email" required className="rounded-2xl h-14 bg-neutral-50 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary" placeholder="example@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Country / Region</Label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary px-4 font-black text-sm outline-none"
                    >
                      <option value="GB">United Kingdom (GBP)</option>
                      <option value="NG">Nigeria (NGN)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Shipping Address</Label>
                    <Textarea id="address" name="address" required rows={3} className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-0 focus:ring-2 focus:ring-primary p-4" placeholder="Enter your full address" />
                  </div>
                </div>

                <div className="pt-8 space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight pb-4 border-b border-neutral-100 dark:border-neutral-800">2. Payment</h2>
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-full">
                      <FiX className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase">Test Mode Only</p>
                      <p className="text-xs text-neutral-400">Payment processing currently in development.</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-20 rounded-full text-xl font-black uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-all" disabled={loading}>
                  {loading ? "Processing..." : "Complete Order"}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-xl sticky top-8">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800 shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm uppercase tracking-tight truncate">{item.name}</h4>
                      {item.size && (
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Size: {item.size}</p>
                      )}
                      <p className="text-xs font-bold text-neutral-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black">{formatPrice(item.price * item.quantity, country)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Subtotal</span>
                  <span className="font-black">{formatPrice(total, country)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Shipping</span>
                  <span className="text-xs font-black uppercase text-primary tracking-widest">Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs font-black uppercase tracking-widest">Total</span>
                  <span className="text-4xl font-black tracking-tighter">{formatPrice(total, country)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
