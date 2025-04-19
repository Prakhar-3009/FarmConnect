// app/dashboard/farmers/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { farmersApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FarmerDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [farmer, setFarmer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const data = await farmersApi.getById(id as string)
        setFarmer(data)
      } catch (error) {
        console.error("Failed to load farmer", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFarmer()
  }, [id])
  console.log(farmer);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    )
  }

  if (!farmer) {
    return <p className="text-center text-red-500">Farmer not found.</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="shadow-md rounded-2xl p-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">{farmer.name}</h2>
          <div className="text-sm text-muted-foreground">Aadhar Number: {farmer.adharNumber}</div>
          <div className="text-sm">Age: {farmer.age}</div>
          <div className="text-sm">Gender: {farmer.gender}</div>
          <div className="text-sm">Phone: {farmer.phone}</div>
          <div className="text-sm">Address: {farmer.address}</div>
          <div className="text-sm">Farming Type: {farmer.farmingType}</div>
        </CardContent>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => router.push("/dashboard/farmers")}>
            Back to List
          </Button>
        </div>
      </Card>
    </div>
  )
}
