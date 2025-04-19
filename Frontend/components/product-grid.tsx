"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, ShoppingCart, Trash, Loader2 } from "lucide-react"
import { productsApi } from "@/lib/api"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

type Product = {
  id: number | string
  name: string
  price: string
  description: string
  image?: string
  owner: string
  ownerEmail?: string
}

export function ProductGrid({
  searchTerm,
  sortOption
}: {
  searchTerm: string
  sortOption: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productsApi.delete(id.toString())
        setProducts(products.filter((product) => product.id !== id))
        toast.success("Product deleted successfully")
      } catch (err) {
        console.error("Error deleting product:", err)
        toast.error("Failed to delete product")
      }
    }
  }

  const handlePurchase = (product: Product) => {
    if (product.ownerEmail) {
      window.location.href = `mailto:${product.ownerEmail}?subject=Interest in ${product.name}&body=Hello, I am interested in purchasing ${product.name} listed on FarmConnect. Please provide more details.`
    } else {
      toast.error("Contact information not available")
    }
  }

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""))
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""))
    
      if (sortOption === "price-low-high") return priceA - priceB
      if (sortOption === "price-high-low") return priceB - priceA
      return 0
    })
    
    console.log("Sort Option:", sortOption)
    console.log("Prices:", filteredProducts.map(p => p.price))


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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No products found. Add your first product to get started.
        </div>
      ) : (
        filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={product.image || "/grid.jpg?height=200&width=300"}
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
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" onClick={() => handlePurchase(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Purchase
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
