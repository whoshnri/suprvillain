import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MoveRight } from "lucide-react"
import { ProductGrid } from "@/components/product-grid"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/currency"
import { headers } from "next/headers"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const country = (await headers()).get("x-vercel-ip-country") || "GB"

  const activeCampaigns = await prisma.campaign.findMany({
    where: { status: "active" },
    include: {
      products: {
        take: 3,
        orderBy: { createdAt: "desc" }
      }
    },
    orderBy: { createdAt: "desc" },
  })

  // Fallback to all if none active for demo
  const campaignsToShow = activeCampaigns.length > 0
    ? activeCampaigns
    : await prisma.campaign.findMany({
      include: {
        products: {
          take: 3,
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    })

  const [heroCampaign, ...otherCampaigns] = campaignsToShow

  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] dark:bg-neutral-950">
      {/* Editorial Lookbook Hero */}
      {heroCampaign && (
        <section className="w-full overflow-hidden">
          <div className="relative h-screen w-full group overflow-hidden shadow-2xl">
            {heroCampaign.image ? (
              <Image
                src={heroCampaign.image}
                alt={heroCampaign.title}
                fill
                priority
                className="object-cover w-full transition-transform duration-[3s] group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900" />
            )}

            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center items-start p-12 md:p-24 pb-32">
              <div className="max-w-3xl animate-in fade-in slide-in-from-left-12 duration-1000">
                <Badge className="mb-6 bg-white/10 backdrop-blur-md text-white border-white/20 px-5 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold">
                  Latest Drop
                </Badge>
                <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter text-white leading-[0.85] uppercase mb-8">
                  {heroCampaign.title.split(' ').map((word, i) => (
                    <span key={i} className="block last:text-primary">{word}</span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 max-w-xl mb-12 font-medium leading-relaxed tracking-tight border-l-2 border-primary pl-6 hover:border-white transition-colors">
                  {heroCampaign.description}
                </p>
                <Button size="lg" className="h-16 px-10 text-lg font-black rounded-full group bg-primary text-black hover:bg-white transition-all shadow-xl" asChild>
                  <Link href={`/campaign/${heroCampaign.id}`} className="flex items-center gap-3">
                    EXPLORE NOW
                    <ArrowRight className="h-10 w-10" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 text-white/40 tracking-[0.5em] text-[10px] font-bold uppercase vertical-text">
              <span>Scroll Down</span>
              <div className="h-12 w-px bg-white/20 relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce-slow" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Campaign Sections */}
      <div className="space-y-0">
        {campaignsToShow.map((campaign, idx) => (
          <section key={campaign.id} className={`py-24 md:py-40 ${idx % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-950/50'}`}>
            <div className="container mx-auto px-4 max-w-7xl">
              <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}>

                {/* Editorial Visual */}
                <div className="w-full lg:w-3/5 relative group">
                  <div className="relative aspect-4/5 md:aspect-16/10 overflow-hidden rounded-[2.5rem] shadow-xl">
                    {campaign.image ? (
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                    )}
                  </div>
                </div>

                {/* Editorial Content & Product Grid */}
                <div className="w-full lg:w-2/5 space-y-10">
                  <div className="space-y-6">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">Campaign Collection</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                      {campaign.title}
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-md">
                      {campaign.description}
                    </p>
                  </div>

                  {/* Curated Product Preview */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Featured Products</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {campaign.products.map((product: any) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="group/item">
                          <div className="relative aspect-3/4 bg-neutral-100 dark:bg-neutral-800 overflow-hidden mb-2 rounded-2xl">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-xs opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <span className="text-[10px] font-bold text-white uppercase truncate block">{product.name}</span>
                            </div>
                          </div>
                          <p className="text-[11px] font-black">{formatPrice(product.price, country)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button size="lg" className="h-14 px-8 text-sm font-black rounded-full group bg-black text-white hover:bg-primary hover:text-black transition-all shadow-lg" asChild>
                      <Link href={`/campaign/${campaign.id}`} className="flex items-center gap-3">
                        VIEW DETAILS
                        <ArrowRight className="h-6 w-6" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-24 md:py-32 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              All <span className="text-primary">Products</span>
            </h2>
            <span className="text-muted-foreground font-bold tracking-[0.3em] text-[10px] uppercase">
              All Items
            </span>
          </div>
          <ProductGrid products={allProducts} country={country} />
        </div>
      </section>

      {/* Editorial Footer / Transmission */}
    </main>
  )
}
