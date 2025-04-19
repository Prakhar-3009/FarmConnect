"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboard, Users, ShoppingBag, Leaf, ClipboardList, Settings, Search, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
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
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">FarmConnect</span>
        </div>
        <form className="px-4 py-2">
          <div className="relative">
            <SidebarInput placeholder="Search..." className="pl-8" />
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </form>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={route.active} tooltip={route.label}>
                    <Link href={route.href}>
                      <route.icon className="h-4 w-4" />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <UserButton afterSignOutUrl="/" />
          <Link href="/sign-out" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
