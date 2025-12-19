import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function CategoryGrid({
  categories,
}: {
  categories: { name: string; image: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/?category=${category.name}`}
          className="group"
        >
          <Card className="overflow-hidden bg-card/80 hover:bg-card border backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 relative aspect-square
          ">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
          </Card>
        </Link>
      ))}
    </div>
  )
}
