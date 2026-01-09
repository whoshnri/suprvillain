"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProduct } from "@/app/actions/products"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/types"
import { SizeSelector } from "@/components/admin/size-selector"
import { useState } from "react"
import { Size } from "@/lib/generated/prisma/enums"

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  allCampaigns = []
}: {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  allCampaigns?: { id: string, title: string }[]
}) {
  const router = useRouter()
  const [sizes, setSizes] = useState<Size[]>(product.sizes || [])
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(product.campaignId || "none")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Explicitly handle campaign assignment
    const finalCampaignId = selectedCampaignId === "none" ? "" : selectedCampaignId
    if (finalCampaignId !== undefined) {
      formData.set("campaignId", finalCampaignId)
    }

    await updateProduct(product.id, formData, sizes)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input id="edit-name" name="name" defaultValue={product.name} required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                name="category"
                defaultValue={product.category}
                required
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              defaultValue={product.description}
              required
              rows={3}
              className="rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                name="stock"
                type="number"
                defaultValue={product.stock}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {allCampaigns.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="edit-campaign">Campaign Assignment</Label>
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
            <Label htmlFor="edit-image">Image URL</Label>
            <Input
              id="edit-image"
              name="image"
              type="url"
              defaultValue={product.image ? product.image : ""}
              required
              className="rounded-xl"
            />
          </div>
          <Button type="submit" className="w-full rounded-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
