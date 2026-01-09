import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function CategoryGrid({
  categories,
}: {
  categories: { name: string; image: string }[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/?category=${category.name}`}
          className="group relative h-96 overflow-hidden"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">
              {category.name}
            </h3>
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity mt-2">
              Explore Lineup
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
