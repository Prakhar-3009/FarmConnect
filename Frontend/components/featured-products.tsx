import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: "$4.99 / kg",
      description: "Fresh, locally grown organic tomatoes.",
      image: "/tomato.jpg?height=200&width=300",
      owner: "Green Valley Farms",
    },
    {
      id: 2,
      name: "Premium Rice",
      price: "$12.99 / 5kg",
      description: "High-quality rice grown using sustainable practices.",
      image: "/rice.jpg?height=200&width=300",
      owner: "Sunrise Agro",
    },
    {
      id: 3,
      name: "Mango",
      price: "$3.49 / kg",
      description: "Rich, juicy & sweet hand-picked farm-fresh mangoes.",
      image: "/mango.jpg?height=200&width=300",
      owner: "Dairy Delight",
    },
    {
      id: 4,
      name: "Organic Honey",
      price: "$8.99 / jar",
      description: "Pure, unfiltered honey from local beekeepers.",
      image: "/honey.jpg?height=200&width=300",
      owner: "Bee Haven",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.owner}</p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                {product.price}
              </Badge>
            </div>
            <p className="text-sm mt-2">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
