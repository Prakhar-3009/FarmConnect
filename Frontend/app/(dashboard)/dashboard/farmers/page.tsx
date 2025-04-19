"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FarmerTable } from "@/components/farmer-table"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { farmersApi } from "@/lib/api"
import { toast } from "react-hot-toast"

type Farmer = {
  id: number | string
  name: string
  adharNumber: string
  age: number
  gender: string
  phone: string
  address: string
  farmingType: string
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const data = await farmersApi.getAll()
        setFarmers(data)
      } catch (err) {
        console.error("Failed to load farmers", err)
        toast.error("Failed to load farmers")
      }
    }

    fetchFarmers()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      try {
        await farmersApi.delete(id.toString())
        setFarmers(farmers.filter((farmer) => farmer.id !== id))
        toast.success("Farmer deleted successfully")
      } catch (err) {
        console.error("Error deleting farmer:", err)
        toast.error("Failed to delete farmer")
      }
    }
  }

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.phone.includes(searchQuery) ||
    farmer.adharNumber.includes(searchQuery)
  )

  const handleExport = () => {
    const csvContent = [
      ["Name", "Aadhar Number", "Age", "Gender", "Phone", "Farming Type"],
      ...filteredFarmers.map(f =>
        [f.name, f.adharNumber, f.age, f.gender, f.phone, f.farmingType]
      ),
    ]
      .map(row => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "farmers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmers</h1>
          <p className="text-muted-foreground">Manage and view all registered farmers in the system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/farmers/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Farmer
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search farmers..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline" onClick={handleExport}>Export</Button>
            </div>
          </div>
          <FarmerTable farmers={filteredFarmers} onDelete={handleDelete} />
        </div>
      </Card>
    </div>
  )
}
