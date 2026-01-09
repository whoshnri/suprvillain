import prisma from "@/lib/prisma"
import { CampaignList } from "@/components/admin/campaign-list"
import { CreateCampaignButton } from "@/components/admin/create-campaign-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductManagement } from "@/components/admin/product-management"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: "desc" },
    include: { products: true },
  })

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  // Hack: casting to any because generated types aren't updated yet
  const typedCampaigns: any[] = campaigns
  const typedProducts: any[] = products

  return (
    <main className="min-h-screen bg-background/50">
      <div className="container py-8 mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your collections and inventory across the platform.</p>
          </div>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="campaigns" className="rounded-lg px-6">Campaigns</TabsTrigger>
            <TabsTrigger value="products" className="rounded-lg px-6">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6 focus-visible:outline-none">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Campaigns</h2>
              <CreateCampaignButton />
            </div>
            <CampaignList campaigns={typedCampaigns} />
          </TabsContent>

          <TabsContent value="products" className="focus-visible:outline-none">
            <ProductManagement
              products={typedProducts}
              allCampaigns={typedCampaigns.map(c => ({ id: c.id, title: c.title }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
