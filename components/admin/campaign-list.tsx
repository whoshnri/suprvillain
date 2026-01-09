"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit } from "lucide-react"
import Image from "next/image"
import { DeleteCampaignButton } from "./delete-campaign-button"

interface Campaign {
    id: string
    title: string
    description: string
    image?: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    products?: any[]
}

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
    if (campaigns.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No campaigns found. Create one to get started.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
                <Card key={campaign.id} className="group overflow-hidden py-0">
                    <CardHeader className="p-0">
                        {campaign.image && (
                            <div className="relative aspect-video w-full overflow-hidden border-b">
                                <Image
                                    src={campaign.image}
                                    alt={campaign.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <CardTitle className="line-clamp-1">{campaign.title}</CardTitle>
                                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                                    {campaign.status}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {campaign.description}
                        </p>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-4 flex gap-3 mt-auto">
                        <Button asChild className="flex-1 rounded-full" variant="outline">
                            <Link href={`/admin/campaign/${campaign.id}`}>
                                View Details
                            </Link>
                        </Button>
                        <DeleteCampaignButton id={campaign.id} title={campaign.title} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
