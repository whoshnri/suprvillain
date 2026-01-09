"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Size } from "@/lib/generated/prisma/enums"


export async function createProduct(formData: FormData, sizes: Size[]) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const image = formData.get("image") as string
  const category = formData.get("category") as string
  const stock = Number.parseInt(formData.get("stock") as string)
  const campaignId = formData.get("campaignId") as string

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      category,
      stock,
      sizes,
      campaignId,
    },
  })

  revalidatePath("/admin")
  revalidatePath(`/admin/campaign/${campaignId}`)
  revalidatePath("/")
}

export async function updateProduct(id: string, formData: FormData, sizes: Size[]) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const image = formData.get("image") as string
  const category = formData.get("category") as string
  const stock = Number.parseInt(formData.get("stock") as string)
  const campaignId = formData.get("campaignId") as string

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      image,
      category,
      stock,
      sizes,
      campaignId,
    },
  })

  revalidatePath("/admin")
  revalidatePath(`/admin/campaign/${campaignId}`)
  revalidatePath("/")
  revalidatePath(`/product/${id}`)
}

export async function deleteProduct(id: string, campaignId?: string) {
  await prisma.product.delete({
    where: { id },
  })

  revalidatePath("/admin")
  if (campaignId) revalidatePath(`/admin/campaign/${campaignId}`)
  revalidatePath("/")
}
