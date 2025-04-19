import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RecordsTable } from "@/components/records-table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function RecordsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Records & Triggers</h1>
          <p className="text-muted-foreground">View audit logs and system activity records.</p>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search records..." className="w-full pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
          <RecordsTable />
        </div>
      </Card>
    </div>
  )
}
