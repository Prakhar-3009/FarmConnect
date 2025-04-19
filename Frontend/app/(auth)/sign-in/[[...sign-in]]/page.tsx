import { SignIn } from "@clerk/nextjs"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">FarmConnect</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 w-full max-w-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to access your farm management dashboard</p>
          </div>
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none",
                formButtonPrimary: "bg-green-600 hover:bg-green-700",
              },
            }}
            redirectUrl="/dashboard"
          />
        </div>
      </main>
    </div>
  )
}
