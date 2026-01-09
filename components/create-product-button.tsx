"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiPlus } from "react-icons/fi"
import { useState } from "react"
import { createProduct } from "@/app/actions/products"
import { useRouter } from "next/navigation"
import { SizeSelector } from "@/components/admin/size-selector"
import { Size } from "@/lib/generated/prisma/enums"

export function CreateProductButton({
  campaignId,
  allCampaigns = []
}: {
  campaignId?: string
  allCampaigns?: { id: string, title: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [sizes, setSizes] = useState<Size[]>([])
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaignId || "none")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Explicitly handle campaign assignment
    const finalCampaignId = campaignId || (selectedCampaignId === "none" ? "" : selectedCampaignId)
    if (finalCampaignId) {
      formData.set("campaignId", finalCampaignId)
    }

    await createProduct(formData, sizes)
    setOpen(false)
    setSizes([])
    setSelectedCampaignId(campaignId || "none")
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <FiPlus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" required className="rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required rows={3} className="rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" required className="rounded-xl" />
            </div>
          </div>

          {!campaignId && allCampaigns.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="campaign">Assign to Campaign (Optional)</Label>
              <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select a campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Independent Product)</SelectItem>
                  {allCampaigns.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Available Sizes</Label>
            <SizeSelector selectedSizes={sizes as any} onSizesChange={(s) => setSizes(s as any)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" type="url" required className="rounded-xl" />
          </div>
          <Button type="submit" className="w-full rounded-full">
            Create Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
