"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { recordsApi } from "@/lib/api"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type Record = {
  id: number | string
  farmerId: string
  farmerName: string
  action: string
  timestamp: string
}

export function RecordsTable() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await recordsApi.getAll()
        setRecords(data)
      } catch (err) {
        console.error("Error fetching records:", err)
        setError("Failed to load records. Please try again.")
        toast.error("Failed to load records")
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  const getActionBadge = (action: string) => {
    switch (action) {
      case "Farmer Added":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{action}</Badge>
      case "Farmer Updated":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{action}</Badge>
      case "Product Added":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{action}</Badge>
      case "Product Updated":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{action}</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

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
            <TableHead>Farmer ID</TableHead>
            <TableHead>Farmer Name</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No records found. Activity will be recorded here as you use the system.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.farmerId}</TableCell>
                <TableCell>{record.farmerName}</TableCell>
                <TableCell>{getActionBadge(record.action)}</TableCell>
                <TableCell>{record.timestamp}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
