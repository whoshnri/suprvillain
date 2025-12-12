"use server"

import prisma from "@/lib/prisma"
import type { CartItem } from "@/lib/cart-context"

export async function createOrder(formData: FormData, items: CartItem[], total: number) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const address = formData.get("address") as string

  const order = await prisma.order.create({
    data: {
      customerName: name,
      customerEmail: email,
      customerAddress: address,
      total,
      status: "pending",
      items: {
        create: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
  })

  return { id: order.id }
}
