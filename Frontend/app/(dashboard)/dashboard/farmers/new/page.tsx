import { FarmerForm } from "@/components/farmer-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewFarmerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/farmers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Farmer</h1>
          <p className="text-muted-foreground">Register a new farmer in the system.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Information</CardTitle>
          <CardDescription>Enter the details of the farmer you want to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <FarmerForm />
        </CardContent>
      </Card>
    </div>
  )
}
