"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteCampaign } from "@/app/actions/campaigns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

export function DeleteCampaignButton({ id, title }: { id: string; title: string }) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteCampaign(id)
            setOpen(false)
            router.push("/admin")
            router.refresh()
        } catch (error) {
            console.error("Failed to delete campaign:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon" className="rounded-full h-10 w-10">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tight">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium pt-2">
                        This will permanently delete the <span className="text-foreground font-bold">{title}</span> campaign.
                        All products associated with this campaign will also be deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex flex-row gap-3">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-full font-bold uppercase tracking-widest text-[10px] flex-1">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleDelete}
                        disabled={loading}
                        variant="destructive"
                        className="rounded-full font-bold uppercase tracking-widest text-[10px] flex-1"
                    >
                        {loading ? "Deleting..." : "Delete Campaign"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
