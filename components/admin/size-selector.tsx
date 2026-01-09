"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export enum Size {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL",
}

interface SizeSelectorProps {
    selectedSizes: Size[]
    onSizesChange: (sizes: Size[]) => void
}

export function SizeSelector({ selectedSizes, onSizesChange }: SizeSelectorProps) {
    const toggleSize = (size: Size) => {
        if (selectedSizes.includes(size)) {
            onSizesChange(selectedSizes.filter((s) => s !== size))
        } else {
            onSizesChange([...selectedSizes, size])
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            {Object.values(Size).map((size) => {
                const isSelected = selectedSizes.includes(size)
                return (
                    <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={cn(
                            "inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                            isSelected
                                ? "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                : "border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        {size}
                    </button>
                )
            })}
        </div>
    )
}
