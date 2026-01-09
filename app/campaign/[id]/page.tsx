import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { headers } from "next/headers"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const country = (await headers()).get("x-vercel-ip-country") || "GB"

    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: {
            products: {
                orderBy: { createdAt: "desc" },
            },
        },
    })

    if (!campaign) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#f8f8f8] dark:bg-neutral-950">
            {/* Editorial Campaign Header */}
            <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-end pb-20">
                {campaign.image ? (
                    <Image
                        src={campaign.image}
                        alt={campaign.title}
                        fill
                        priority
                        className="object-cover brightness-50"
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900" />
                )}
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl border-l-4 border-primary pl-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-4 block">Deployment Log</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase mb-6 leading-[0.85]">
                            {campaign.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed tracking-tight italic">
                            — {campaign.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="container py-24 mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12 border-b-2 border-neutral-100 dark:border-neutral-800 pb-8">
                    <h2 className="text-3xl font-black tracking-tight uppercase">Operational Inventory</h2>
                    <span className="text-muted-foreground font-bold tracking-widest text-[10px] uppercase">
                        {campaign.products.length} Items Recovered
                    </span>
                </div>
                <ProductGrid products={campaign.products} country={country} />
            </section>
        </main>
    )
}
