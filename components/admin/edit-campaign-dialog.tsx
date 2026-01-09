"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"
import { useState } from "react"
import { updateCampaign } from "@/app/actions/campaigns"
import { useRouter } from "next/navigation"

interface Campaign {
    id: string
    title: string
    description: string
    image?: string | null
    status: string
}

export function EditCampaignDialog({ campaign }: { campaign: Campaign }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await updateCampaign(campaign.id, formData)
        setOpen(false)
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Campaign
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-title">Title</Label>
                        <Input id="edit-title" name="title" defaultValue={campaign.title} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea id="edit-description" name="description" defaultValue={campaign.description} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-image">Banner Image URL</Label>
                        <Input id="edit-image" name="image" defaultValue={campaign.image || ""} placeholder="https://..." className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select name="status" defaultValue={campaign.status}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full rounded-full">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
