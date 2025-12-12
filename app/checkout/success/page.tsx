import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FiCheckCircle } from "react-icons/fi"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <FiCheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
        </div>
        <Button asChild className="rounded-full" size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </main>
  )
}
