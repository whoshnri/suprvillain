import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FiTwitter, FiInstagram, FiFacebook } from "react-icons/fi"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary/50 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Suprvillain</h4>
            <p className="text-muted-foreground text-sm">Style that hits different.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Don't miss a drop.</h4>
            <form className="flex gap-2 justify-center md:justify-start">
              <Input type="email" placeholder="Enter your email" className="rounded-full" />
              <Button type="submit" className="rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Join the Squad</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href="#" aria-label="Twitter">
                <FiTwitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FiInstagram className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <FiFacebook className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Suprvillain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
