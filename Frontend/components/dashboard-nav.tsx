"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ShoppingBag, Leaf, ClipboardList, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/farmers",
      label: "Farmers",
      icon: Users,
      active: pathname.includes("/dashboard/farmers"),
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: ShoppingBag,
      active: pathname.includes("/dashboard/products"),
    },
    {
      href: "/dashboard/farming-types",
      label: "Farming Types",
      icon: Leaf,
      active: pathname.includes("/dashboard/farming-types"),
    },
    {
      href: "/dashboard/records",
      label: "Records",
      icon: ClipboardList,
      active: pathname.includes("/dashboard/records"),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname.includes("/dashboard/settings"),
    },
  ]

  return (
    <nav className="space-y-1">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={route.active ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            route.active && "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800",
          )}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
