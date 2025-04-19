"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Loader2 } from "lucide-react"
import { farmingTypesApi } from "@/lib/api"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

type FarmingType = {
  id: number | string
  name: string
  description: string
  farmersCount: number
}

export function FarmingTypeTable({ searchTerm }: { searchTerm: string }) {
  const [farmingTypes, setFarmingTypes] = useState<FarmingType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchFarmingTypes = async () => {
      try {
        const data = await farmingTypesApi.getAll()
        setFarmingTypes(data)
      } catch (err) {
        console.error("Error fetching farming types:", err)
        setError("Failed to load farming types. Please try again.")
        toast.error("Failed to load farming types")
      } finally {
        setLoading(false)
      }
    }

    fetchFarmingTypes()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this farming type?")) {
      try {
        await farmingTypesApi.delete(id.toString())
        setFarmingTypes(farmingTypes.filter((type) => type.id !== id))
        toast.success("Farming type deleted successfully")
      } catch (err) {
        console.error("Error deleting farming type:", err)
        toast.error("Failed to delete farming type")
      }
    }
  }

  const filteredTypes = farmingTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Farmers Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTypes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No matching farming types found.
              </TableCell>
            </TableRow>
          ) : (
            filteredTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell>{type.description}</TableCell>
                <TableCell>{type.farmersCount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/farming-types/edit/${type.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(type.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
