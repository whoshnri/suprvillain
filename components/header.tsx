import Link from "next/link"
import { CartSheet } from "./cart-sheet"
import { ThemeSwitcher } from "./theme-switcher"
import { FiInstagram } from "react-icons/fi"

function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7" />
    </svg>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 px-3 z-50 w-full border-b  backdrop-blur-2xl flex justify-center">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2">
          <StoreIcon className="w-6 h-6" />
          <span className="hidden sm:inline-block">Suprvillain Store</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="https://www.instagram.com/vinyloncloth/" className="border border-white/20 rounded-full p-2">
          <FiInstagram className="w-5 h-5 text-foreground/80 "/>
          </Link>
          <ThemeSwitcher />
          <CartSheet />
        </nav>
      </div>
    </header>
  )
}
