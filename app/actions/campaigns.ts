"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCampaign(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const image = formData.get("image") as string

    await prisma.campaign.create({
        data: {
            title,
            description,
            image,
            status: status || "draft",
        },
    })

    revalidatePath("/admin")
    revalidatePath("/")
}

export async function updateCampaign(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const image = formData.get("image") as string

    await prisma.campaign.update({
        where: { id },
        data: {
            title,
            description,
            image,
            status,
        },
    })

    revalidatePath("/admin")
    revalidatePath("/")
    revalidatePath(`/admin/campaign/${id}`)
}

export async function deleteCampaign(id: string) {
    await prisma.campaign.delete({
        where: { id },
    })

    revalidatePath("/admin")
    revalidatePath("/")
}
