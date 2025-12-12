const USD_TO_GBP_RATE = 0.82
const USD_TO_NGN_RATE = 1450

export function formatPrice(
  priceInUsd: number,
  country: string = "GB",
): string {
  if (country === "NG") {
    const priceInNgn = priceInUsd * USD_TO_NGN_RATE
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(priceInNgn)
  }

  const priceInGbp = priceInUsd * USD_TO_GBP_RATE
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(priceInGbp)
}
