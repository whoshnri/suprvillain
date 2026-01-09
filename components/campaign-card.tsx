import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface Campaign {
    id: string
    title: string
    description: string
    status: string
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
    return (
        <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-xl relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="relative z-10 bg-white/5 dark:bg-white/5 border-b border-white/10 p-6">
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {campaign.title}
                    </CardTitle>
                    <Sparkles className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100" />
                </div>
                <CardDescription className="line-clamp-2 text-muted-foreground/90 font-medium leading-relaxed">
                    {campaign.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-8 relative z-10 px-6">
                <div className="aspect-video bg-linear-to-tr from-muted/50 to-muted/80 flex items-center justify-center rounded-2xl mb-4 overflow-hidden border border-white/10 shadow-inner group-hover:border-primary/20 transition-colors duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-primary/5 to-transparent group-hover:from-primary/10 transition-all duration-700" />
                    <p className="text-muted-foreground font-bold tracking-widest text-xs uppercase relative z-20">
                        Mission Preview
                    </p>
                </div>
            </CardContent>

            <CardFooter className="relative z-10 p-6 pt-2">
                <Button asChild className="w-full rounded-2xl h-12 font-bold group-hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/20">
                    <Link href={`/campaign/${campaign.id}`} className="flex items-center justify-center w-full gap-2">
                        Enter Drop
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

