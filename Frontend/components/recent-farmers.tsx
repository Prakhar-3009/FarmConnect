"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { farmersApi, recordsApi } from "@/lib/api"

// Interfaces
interface Farmer {
  id: number
  name: string
  adharNumber: string
  age: number
  gender: string
  phone: string
  address: string
  farmingType: string
}

interface Record {
  id: number
  farmerId: string
  farmerName: string
  action: string
  timestamp: string
}

interface FarmerWithTimestamp extends Farmer {
  created_at: string
}

// Helpers
function getInitials(name: string): string {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "NA"
}

function formatPhone(phone: string): string {
  return phone && phone.length >= 4 ? `XXXX-XXXX-${phone.slice(-4)}` : "XXXX-XXXX-XXXX"
}

function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const created = new Date(dateString)
  const diffMs = now.getTime() - created.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (days === 0) return "Today"
  if (days === 1) return "1 day ago"
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`
}

// Component
export default function RecentFarmers() {
  const [farmers, setFarmers] = useState<FarmerWithTimestamp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentFarmers = async () => {
      try {
        setLoading(true)

        const [farmersResponse, recordsResponse] = await Promise.all([
          farmersApi.getAll(),
          recordsApi.getAll(),
        ])

        const farmerCreationMap = new Map<number, string>()

        recordsResponse.forEach((record: Record) => {
          const isAddAction =
            record.action.toLowerCase().includes("add") ||
            record.action.toLowerCase().includes("create") ||
            record.action.toLowerCase() === "farmer inserted"
          const farmerId = parseInt(record.farmerId)

          if (isAddAction && !isNaN(farmerId)) {
            const existing = farmerCreationMap.get(farmerId)
            if (!existing || new Date(record.timestamp) > new Date(existing)) {
              farmerCreationMap.set(farmerId, record.timestamp)
            }
          }
        })

        const enrichedFarmers = farmersResponse
          .map((farmer: Farmer) => {
            const timestamp = farmerCreationMap.get(farmer.id)
            if (timestamp) {
              return {
                ...farmer,
                created_at: timestamp,
              }
            }
            return null
          })
          .filter(Boolean) as FarmerWithTimestamp[]

        const sortedFarmers = enrichedFarmers.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        setFarmers(sortedFarmers.slice(0, 5))
      } catch (err: any) {
        console.error("Failed to fetch recent farmers", err)
        setError("Failed to load recent farmers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecentFarmers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recently Added Farmers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : farmers.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No farmers have been added recently
          </div>
        ) : (
          <div className="space-y-4">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9 bg-primary/10 text-foreground">
                    <AvatarFallback>{getInitials(farmer.name)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-none">{farmer.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPhone(farmer.phone)}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full">
                    {farmer.farmingType}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(farmer.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
