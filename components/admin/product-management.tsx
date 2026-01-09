"use client"

import { ProductList } from "@/components/product-list"
import { CreateProductButton } from "@/components/create-product-button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"

interface ProductManagementProps {
    products: any[]
    allCampaigns: { id: string, title: string }[]
}

export function ProductManagement({ products, allCampaigns }: ProductManagementProps) {
    const [search, setSearch] = useState("")

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 rounded-xl"
                    />
                </div>
                <CreateProductButton allCampaigns={allCampaigns} />
            </div>

            <ProductList products={filteredProducts} allCampaigns={allCampaigns} />
        </div>
    )
}

