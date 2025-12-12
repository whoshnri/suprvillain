"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { FiMoon, FiSun } from "react-icons/fi"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex justify-center items-center"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FiSun className="h-6 w-6 scale-100 dark:hidden" />
      <FiMoon className="h-6 w-6 scale-0 dark:scale-100 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
