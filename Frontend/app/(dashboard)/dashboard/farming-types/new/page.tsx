import { FarmingTypeForm } from "@/components/farming-type-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewFarmingTypePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/farming-types">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Farming Type</h1>
          <p className="text-muted-foreground">Create a new farming category or classification.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farming Type Information</CardTitle>
          <CardDescription>Enter the details of the farming type you want to add.</CardDescription>
        </CardHeader>
        <CardContent>
          <FarmingTypeForm />
        </CardContent>
      </Card>
    </div>
  )
}
