"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { FarmingTypeTable } from "@/components/farming-type-table"

export default function FarmingTypesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farming Types</h1>
          <p className="text-muted-foreground">Manage farming categories and classifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/farming-types/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Type
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
                placeholder="Search types..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* 🔽 Pass the searchTerm to the table */}
          <FarmingTypeTable searchTerm={searchTerm} />
        </div>
      </Card>
    </div>
  )
}
