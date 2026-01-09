import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductList } from "@/components/product-list"
import { CreateProductButton } from "@/components/create-product-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EditCampaignDialog } from "@/components/admin/edit-campaign-dialog"
import { DeleteCampaignButton } from "@/components/admin/delete-campaign-button"

export const dynamic = "force-dynamic"

export default async function AdminCampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
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

    // Cast to any for now since types might still be refreshing in IDE
    const typedCampaign: any = campaign

    // Need all campaigns for the ProductList dropdown
    const allCampaigns = await prisma.campaign.findMany({ select: { id: true, title: true } })

    return (
        <main className="min-h-screen bg-background/50">
            <div className="container py-8 mx-auto px-4 md:px-6 max-w-7xl">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-6 -ml-4 rounded-full">
                        <Link href="/admin">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>

                    {typedCampaign.image && (
                        <div className="relative h-48 md:h-64 w-full rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-xl">
                            <Image
                                src={typedCampaign.image}
                                alt={typedCampaign.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <Badge className="bg-primary/20 backdrop-blur-md border-primary/30 text-primary uppercase tracking-widest text-[10px] font-bold">
                                    Active Banner
                                </Badge>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold tracking-tight">{typedCampaign.title}</h1>
                                <Badge variant={typedCampaign.status === "active" ? "default" : "outline"}>
                                    {typedCampaign.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-2xl">{typedCampaign.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <EditCampaignDialog campaign={typedCampaign} />
                            <DeleteCampaignButton id={typedCampaign.id} title={typedCampaign.title} />
                            <CreateProductButton campaignId={typedCampaign.id} />
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Campaign Inventory</h2>
                    <ProductList products={typedCampaign.products} allCampaigns={allCampaigns} />
                </div>
            </div>
        </main>
    )
}
