"use client"

import { CartProvider as Provider } from "@/lib/cart-context"
import { useEffect } from "react"
import { useCart } from "@/lib/cart-context"

export function CartProvider({
  children,
  country,
}: {
  children: React.ReactNode
  country: string
}) {
  return (
    <Provider>
      <CountrySetter country={country} />
      {children}
    </Provider>
  )
}

function CountrySetter({ country }: { country: string }) {
  const { setCountry } = useCart()

  useEffect(() => {
    setCountry(country)
  }, [country, setCountry])

  return null
}
