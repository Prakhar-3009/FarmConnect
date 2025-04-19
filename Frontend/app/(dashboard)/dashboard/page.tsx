"use client"
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import RecentFarmers from "@/components/recent-farmers";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { BarChart3, Users, ShoppingBag, Leaf, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { farmersApi, farmingTypesApi ,productsApi} from "@/lib/api"
  
export default function DashboardPage() {
  const [typecount, setTypecount] = useState<number>(0)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await farmingTypesApi.getAll()
        setTypecount(data.length)
      } catch (error) {
        console.error("Failed to fetch farming types", error)
      }
    }

    fetchTypes()
  }, []);
  const [farmercount, setFarmercount] = useState<number>(0)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await farmersApi.getAll()
        setFarmercount(data.length)
      } catch (error) {
        console.error("Failed to fetch farming types", error)
      }
    }

    fetchTypes()
  }, []);
  const [productcount, setProductcount] = useState<number>(0)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await productsApi.getAll()
        setProductcount(data.length)
      } catch (error) {
        console.error("Failed to fetch farming types", error)
      }
    }

    fetchTypes()
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your farm management system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/farmers/new">Add New Farmer</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/products/new">Add New Product</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmercount}</div>
            <p className="text-xs text-muted-foreground">+6% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productcount}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farming Types</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{typecount}</div>
            <p className="text-xs text-muted-foreground">+2 new types added</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+19% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Farmers</CardTitle>
            <CardDescription>Recently added farmers to the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentFarmers />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Farmer Management</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Register and manage farmer profiles with comprehensive details.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/farmers">View Farmers</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Agro Products</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage agricultural products and marketplace listings.</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/products">View Products</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Farming Types</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage farming categories and classifications.</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/farming-types">View Types</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
